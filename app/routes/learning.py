from flask import Blueprint, render_template, session, redirect, url_for, flash, request
from .. import db
from ..models import Course, Lesson, CourseProgress, Lab, QuizQuestion, UserQuizResult
bp=Blueprint("learning",__name__)

def me():
    from ..models import User
    return User.query.get(session.get("user_id"))

@bp.route("/")
def courses():
    items=Course.query.filter_by(published=True).all()
    u=me()
    progress={}
    for c in items:
        total=len(c.lessons)
        if not u or not total:
            progress[c.id]=0
            continue
        done=CourseProgress.query.filter_by(user_id=u.id).join(Lesson, CourseProgress.lesson_id == Lesson.id).filter(Lesson.course_id == c.id).count()
        progress[c.id]=round(done/total*100)
    return render_template("courses.html", courses=items, course_progress=progress)

@bp.route("/course/<slug>")
def course(slug):
    c=Course.query.filter_by(slug=slug,published=True).first_or_404()
    u=me()
    total=len(c.lessons)
    done=CourseProgress.query.filter_by(user_id=u.id).join(Lesson, CourseProgress.lesson_id == Lesson.id).filter(Lesson.course_id == c.id).count() if u and total else 0
    progress=round(done/total*100) if total else 0
    return render_template("course.html",course=c,course_progress=progress, current_user=u)

@bp.route("/lesson/<int:lesson_id>",methods=["GET"])
def lesson(lesson_id):
    l=Lesson.query.get_or_404(lesson_id)
    lab=Lab.query.filter_by(lesson_id=l.id,published=True).first()
    l.lab_slug = lab.slug if lab else None
    quick_quiz = QuizQuestion.query.filter_by(lesson_id=l.id).order_by(QuizQuestion.id).limit(3).all()
    return render_template("lesson.html", lesson=l, quick_quiz=quick_quiz, quick_score=None)

@bp.route("/lesson/<int:lesson_id>/quick-quiz", methods=["POST"])
def quick_quiz(lesson_id):
    l = Lesson.query.get_or_404(lesson_id)
    lab = Lab.query.filter_by(lesson_id=l.id, published=True).first()
    l.lab_slug = lab.slug if lab else None
    questions = QuizQuestion.query.filter_by(lesson_id=l.id).order_by(QuizQuestion.id).limit(3).all()
    correct = 0
    for q in questions:
        if request.form.get(f"qq{q.id}") == q.answer:
            correct += 1
    score = round((correct / len(questions)) * 100) if questions else 0
    u = me()
    if u:
        db.session.add(UserQuizResult(user_id=u.id, lesson_id=l.id, score=score, passed=score >= 70))
        db.session.commit()
    flash(f"Mustahkamlash quiz: {correct}/{len(questions)} — {score}%", "success" if score >= 70 else "info")
    return render_template("lesson.html", lesson=l, quick_quiz=questions, quick_score=score)

@bp.route("/lesson/<int:lesson_id>/complete",methods=["POST"])
def complete(lesson_id):
    u=me()
    if not u: return redirect(url_for("auth.login"))
    l=Lesson.query.get_or_404(lesson_id)
    if not CourseProgress.query.filter_by(user_id=u.id,lesson_id=l.id).first():
        db.session.add(CourseProgress(user_id=u.id,lesson_id=l.id))
        u.xp += l.xp_reward
        db.session.commit()
        flash(f"+{l.xp_reward} XP","success")
    return redirect(url_for("learning.lesson",lesson_id=l.id))

from ..models import Resource

@bp.route("/resources")
def resources():
    return render_template("resources.html", resources=Resource.query.order_by(Resource.category, Resource.id).all())

@bp.route("/resource/<int:resource_id>")
def resource(resource_id):
    r=Resource.query.get_or_404(resource_id)
    return render_template("resource.html", resource=r)

@bp.route("/quiz/<int:lesson_id>", methods=["GET","POST"])
def quiz(lesson_id):
    l=Lesson.query.get_or_404(lesson_id)
    questions=QuizQuestion.query.filter_by(lesson_id=lesson_id).all()
    score=None
    if request.method=="POST" and questions:
        correct=sum(1 for q in questions if request.form.get(f"q{q.id}") == q.answer)
        score=round(correct/len(questions)*100)
        u=me()
        if u:
            db.session.add(UserQuizResult(user_id=u.id, lesson_id=lesson_id, score=score, passed=score>=70))
            if score>=70: u.xp += 25
            db.session.commit()
            flash(("Quizdan o‘tdingiz! +25 XP" if score>=70 else "Quiz natijasi yetarli emas."), "success" if score>=70 else "error")
    return render_template("quiz.html", lesson=l, questions=questions, score=score)
