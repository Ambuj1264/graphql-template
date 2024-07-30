
export interface CreateSchoolInput {
    typeOfSchool: string;
    region: string;
    schoolName: string;
    roshYeshivah: string;
    ryContact: string;
    menahel: string;
    menahelNumber: string;
    yeshivahAddress: string;
    officeAddress: string;
    email: string;
    dormitory: string;
    mashgiach: string;
    yeshivahHours: [string];
    transportation: string;
    visitedWhen: string;
    chasidish: string;
    boxy: string;
    levelOfLearning: string;
    pureness: string;
    relationshipStaffWithBuchrim: string;
    schoolApplication: [string];
    reports: string;
}

export interface UpdateSchoolInput {
    id: string;
    typeOfSchool: string;
    region: string;
    schoolName: string;
    roshYeshivah: string;
    ryContact: string;
    menahel: string;
    menahelNumber: string;
    yeshivahAddress: string;
    officeAddress: string;
    email: string;
    dormitory: string;
    mashgiach: string;
    yeshivahHours: [string];
    transportation: string;
    visitedWhen: string;
    chasidish: string;
    boxy: string;
    levelOfLearning: string;
    pureness: string;
    relationshipStaffWithBuchrim: string;
    schoolApplication: [string];
    reports: string;
}

export interface SchoolListingSharingInput {
    email: [string];
    linkExpireDate: Date;
    shareData: JSON[];
    shareColumn: JSON[];
    url: string;
    sharedBy: string;
    isActive: boolean;
}
export interface UpdateshredSchoolData {
    id: string;
    isActive: boolean;
}