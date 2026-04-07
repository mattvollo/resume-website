const experienceData = [
  {
    company: "iCR",
    role: "DevSecOps Engineer",
    location: "Denver, CO",
    dates: "December 2024 – Present",
    bullets: [
      "Migrated NGINX from individually managed EC2 instances to a Kubernetes deployment, consolidating configuration into a single GitLab source of truth and making changes globally atomic.",
      "Replaced manual mTLS certificate management for 400+ users with Authentik-based SSO, eliminating an operational bottleneck and aligning authentication with modern identity standards.",
      "Built a Python FastAPI backend secured with OAuth2 via Authentik, automating user lifecycle management and two-way active/inactive synchronization across Authentik, RocketChat, and GitLab.",
      "Operate and maintain 60+ EC2 instances across multiple EKS, RDS, and MSK clusters using Terraform and Ansible in AWS GovCloud IL4, supporting a secure ground battle management system."
    ]
  },
  {
    company: "Lockheed Martin",
    role: "Software Engineer",
    location: "Denver, CO",
    dates: "January 2023 – December 2024",
    bullets: [
      "Integrated, tested, and deployed software and hardware products for a large space ground system.",
      "Resolved issues in Docker files, Ansible code, Helm charts, templates, and containerized Java applications.",
      "Supported the transition of a legacy program toward a DevSecOps model."
    ]
  },
  {
    company: "Lockheed Martin",
    role: "Satellite System Engineer Associate",
    location: "Denver, CO",
    dates: "January 2022 – January 2023",
    bullets: [
      "Supported mission requirements across stakeholder and customer interfaces for an active satellite program.",
      "Built automation tooling that reduced manual operational effort and improved process consistency across the team."
    ] 
  }
];
