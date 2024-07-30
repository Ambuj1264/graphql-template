export const role = `
type Role {
    role:String
    isActive: Boolean
    roleConstraint:String
    navMenu:JSON
    rolePermissions:JSON
    id:String
}
type SubMenus{
  Link: String
  IconName: String
  HebrewName: String
  OriginalName: String
}

type NavMenuItem {
    Link: String
    IconName: String
    HebrewName: String
    OriginalName: String
    SubMenus:[SubMenus]
  }
  type NavMenu {
    navMenu: [NavMenuItem]
  }

  
`;
