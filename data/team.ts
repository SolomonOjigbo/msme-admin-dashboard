export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin Officer";
  status: "Active" | "Pending" | "Suspended";
  initials: string;
  joined: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Ezekude",
    email: "john.ezekude@gmail.com",
    role: "Super Admin",
    status: "Active",
    initials: "JE",
    joined: "Jan 12, 2025",
  },
  {
    id: "2",
    name: "Amaka Obi",
    email: "amaka.obi@aquaris.io",
    role: "Admin Officer",
    status: "Active",
    initials: "AO",
    joined: "Feb 03, 2025",
  },
  {
    id: "3",
    name: "Tunde Bakare",
    email: "tunde.bakare@aquaris.io",
    role: "Admin Officer",
    status: "Pending",
    initials: "TB",
    joined: "Mar 18, 2025",
  },
  {
    id: "4",
    name: "Grace Eze",
    email: "grace.eze@aquaris.io",
    role: "Admin Officer",
    status: "Active",
    initials: "GE",
    joined: "Mar 24, 2025",
  },
  {
    id: "5",
    name: "Kelechi Nwosu",
    email: "kelechi.nwosu@aquaris.io",
    role: "Admin Officer",
    status: "Suspended",
    initials: "KN",
    joined: "Apr 02, 2025",
  },
];
