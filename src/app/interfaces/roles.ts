export interface RolePermissions {
  sectionPermissionsId: string;
  nameSectionPermissions: string;
  sectionPermissions: boolean;
  subPermissions: [
    {
      permissionA: boolean;
    },
    {
      permissionB: boolean;
    },
    {
      permissionC: boolean;
    },
    {
      permissionD: boolean;
    }
  ];
}

export interface Role {
  roleId: string;
  sectionName: string;
  roleName: string;
  permissions: Array<RolePermissions>;
}

export interface AdminRole {
  sectionTitle: string;
  rolesList: Array<Role>;
}
