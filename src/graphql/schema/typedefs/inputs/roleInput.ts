export const roleInput = `
input roleInput {
    role:String
    roleConstraint:String
    navMenu:JSON
    isActive: Boolean
    rolePermissions:JSON
}

input UpdateRoleInput{
    id: String
    isActive: Boolean
    updatedPermissions:JSON
}
`;