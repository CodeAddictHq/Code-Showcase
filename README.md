# ⚠️ Development Version 2 (Transition Build)

> This version is very similar to v1, but represents an important transition phase in the project.

This branch is mostly identical to the first prototype, but it carries a meaningful story from the development process. It was kept not because of major feature differences, but because of what happened during its creation.

---

## 🧠 Context

During the development of this version:

- I upgraded the authentication system from **session-based auth → JWT token-based auth**
- The goal was to make the project more **production-ready and scalable**
- However, during the workflow, I mistakenly pushed an older state of the code instead of the updated main version
- After that, I deleted my local repository, which caused an unexpected setback in the project timeline

This mistake resulted in roughly **2 extra days of rework** to restore and finalize the project properly.

---

## ⚙️ Technical State

- Mostly identical to **v1 prototype**
- Uses **JWT token authentication instead of session auth**
- Still contains early-stage UI issues (e.g., loading animation bugs)
- No major architectural improvements beyond auth update

---

## 🚧 Known Limitations

- ❌ Still inherits most limitations of v1
- ❌ UI bugs and rough animations remain
- ❌ Not significantly refactored or optimized
- ❌ Only authentication layer differs (JWT implementation)

---

## 📌 Why This Version Exists

This version is preserved not for technical advancement, but for:

- Documenting a real development mistake and recovery process
- Showing the transition from session auth → JWT auth thinking
- Keeping a trace of the learning curve and workflow errors
- Respecting the time and effort lost during rework (“lost hours/days” phase)

---

## 🔄 Recommendation

Use the **latest/main branch** for actual usage or deployment.

This version is only for:

- Learning history
- Development reflection
- Understanding evolution of authentication decisions

---

*This is a transitional development snapshot, not a production-ready release.*
