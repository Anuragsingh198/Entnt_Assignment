export const data = {
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
    { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
    { id: "4", role: "Engineer", email: "eng2@entnt.in", password: "engine456" },
    { id: "5", role: "Inspector", email: "inspector2@entnt.in", password: "inspect456" },
    { id: "6", role: "Admin", email: "admin2@entnt.in", password: "admin456" }
  ],
  ships: [
    { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
    { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" },
    { id: "s3", name: "Titanic II", imo: "9822001", flag: "UK", status: "Active" },
    { id: "s4", name: "Hanjin Oslo", imo: "9500003", flag: "South Korea", status: "Docked" }
  ],
  components: [
    { id: "c1", shipId: "s1", name: "Main Engine", serialNumber: "ME-1234", installDate: "2020-01-10", lastMaintenanceDate: "2024-03-12" },
    { id: "c2", shipId: "s2", name: "Radar", serialNumber: "RAD-5678", installDate: "2021-07-18", lastMaintenanceDate: "2023-12-01" },
    { id: "c3", shipId: "s3", name: "Propeller", serialNumber: "PROP-9012", installDate: "2022-03-05", lastMaintenanceDate: "2024-01-15" },
    { id: "c4", shipId: "s4", name: "Navigation System", serialNumber: "NAV-3456", installDate: "2019-09-22", lastMaintenanceDate: "2023-10-10" },
    { id: "c5", shipId: "s1", name: "Generator", serialNumber: "GEN-7890", installDate: "2023-02-18", lastMaintenanceDate: "2024-04-01" }
  ],
  jobs: [
    { id: "j1", componentId: "c1", shipId: "s1", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "3", scheduledDate: "2025-05-05" },
    { id: "j2", componentId: "c2", shipId: "s2", type: "Repair", priority: "Medium", status: "In Progress", assignedEngineerId: "4", scheduledDate: "2025-06-01" },
    { id: "j3", componentId: "c3", shipId: "s3", type: "Replacement", priority: "Low", status: "Pending", assignedEngineerId: "3", scheduledDate: "2025-06-15" },
    { id: "j4", componentId: "c4", shipId: "s4", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "4", scheduledDate: "2025-05-20" },
    { id: "j5", componentId: "c5", shipId: "s1", type: "Upgrade", priority: "High", status: "Scheduled", assignedEngineerId: "3", scheduledDate: "2025-07-10" }
  ]
};

