const projectsData = [
  {
    title: "User Management System (UMS)",
    category: "Python / FastAPI / Authentik / OAuth2",
    summary: "REST API backend for automated user lifecycle management across a ground system's internal platform, secured with OAuth2 Authorization Code flow backed by Authentik SSO.",
    notes: [
      "Syncs UMS data to Authentik and performs two-way active/inactive synchronization to RocketChat (deactivate/reactivate) and GitLab (ban/unban) with configurable dry-run mode before applying changes.",
      "Exposes an inactivity control API that identifies users inactive for 30 or more days, including users who have never logged in, and allows targeted deactivation.",
      "Generates async 90-day CSV reports of Authentik login history and per-application usage, returned via a task ID polling pattern.",
    ]
  },
  {
    title: "Python planning GUI",
    category: "Python",
    summary: "Built a GUI that imports planning objects to test products in support of initializing new program capabilities.",
    notes: [
      "Improved the workflow for validating new capabilities before operational integration."
    ]
  },
  {
    title: "Deployment hash verification",
    category: "Python / Kubernetes",
    summary: "Added a postflight script into the deployment process to verify a container image hash after install.",
    notes: [
      "Helped confirm that deployed content matched the expected artifact in the cluster."
    ]
  },
  {
    title: "Podman microservice simulator",
    category: "Podman",
    summary: "Built and containerized a microservice to simulate an OPS-only external customer for more realistic testing.",
    notes: [
      "Created a better stand-in for operational dependencies during development."
    ]
  },
];
