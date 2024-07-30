import { Role } from "../../../database/role/role";
export const navMenus = async () => {
  const roleConstraint = "SUPER_ADMIN";
    const roles = await Role.createQueryBuilder("role")
      .where({roleConstraint})
      .getOne();
    const menus = roles?.navMenu;
    if (!menus) {
        throw new Error("Nav menus not found.");
    }

    return { navMenu: menus };
  };
