from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for, session, flash, jsonify
from .. import db
from ..models import User, Team, TeamMember, ChatMessage

bp = Blueprint("chat", __name__, url_prefix="/chat")

MAX_MESSAGE = 1200


def current_user():
    uid = session.get("user_id")
    return User.query.get(uid) if uid else None


def membership_for(user_id, team_id):
    return TeamMember.query.filter_by(team_id=team_id, user_id=user_id).first()


@bp.route("/")
def index():
    user = current_user()
    if not user:
        return redirect(url_for("auth.login"))
    teams = []
    for membership in TeamMember.query.filter_by(user_id=user.id).all():
        team = Team.query.get(membership.team_id)
        if team:
            teams.append(team)
    team_id = request.args.get("team", type=int)
    selected = None
    if team_id:
        selected = next((t for t in teams if t.id == team_id), None)
        if selected is None:
            flash("Bu jamoa chatiga kirish huquqingiz yo‘q.", "error")
            team_id = None
    return render_template("chat.html", user=user, teams=teams, selected_team=selected)


@bp.get("/messages")
def messages():
    user = current_user()
    if not user:
        return jsonify({"error": "auth_required"}), 401
    channel = request.args.get("channel", "general").strip().lower()
    team_id = request.args.get("team_id", type=int)
    if channel not in {"general", "team"}:
        return jsonify({"error": "invalid_channel"}), 400
    if channel == "team":
        if not team_id or not membership_for(user.id, team_id):
            return jsonify({"error": "forbidden"}), 403
        q = ChatMessage.query.filter_by(channel="team", team_id=team_id)
    else:
        q = ChatMessage.query.filter_by(channel="general")
    rows = q.order_by(ChatMessage.created_at.desc()).limit(80).all()
    rows.reverse()
    return jsonify({"messages": [
        {
            "id": m.id,
            "username": m.author.username if m.author else "user",
            "body": m.body,
            "created_at": m.created_at.strftime("%H:%M:%S"),
            "mine": m.user_id == user.id,
        } for m in rows
    ]})


@bp.post("/send")
def send():
    user = current_user()
    if not user:
        return jsonify({"error": "auth_required"}), 401
    channel = request.form.get("channel", "general").strip().lower()
    team_id = request.form.get("team_id", type=int)
    body = request.form.get("body", "").strip()
    if channel not in {"general", "team"}:
        return jsonify({"error": "invalid_channel"}), 400
    if not body:
        return jsonify({"error": "empty"}), 400
    if len(body) > MAX_MESSAGE:
        return jsonify({"error": "too_long", "max": MAX_MESSAGE}), 400
    if channel == "team":
        if not team_id or not membership_for(user.id, team_id):
            return jsonify({"error": "forbidden"}), 403
    else:
        team_id = None

    last = ChatMessage.query.filter_by(user_id=user.id, channel=channel, team_id=team_id).order_by(ChatMessage.created_at.desc()).first()
    if last and (datetime.utcnow() - last.created_at).total_seconds() < 1.2:
        return jsonify({"error": "rate_limited"}), 429

    msg = ChatMessage(user_id=user.id, team_id=team_id, channel=channel, body=body)
    db.session.add(msg)
    db.session.commit()
    return jsonify({"ok": True, "message": {
        "id": msg.id,
        "username": user.username,
        "body": msg.body,
        "created_at": msg.created_at.strftime("%Y-%m-%d %H:%M"),
        "mine": True,
    }})
