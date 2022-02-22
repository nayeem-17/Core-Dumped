import Repository from '../Repository';

class PlanningRepository extends Repository {
  constructor() {
    super();
  }
  addPlanning = async (planning: number, organizationId: number) => {
    return null;
  };
  getPlanning = async (planningId: number) => {
    return null;
  };
  getPlanningByOrganization = async (organizationId: number) => {
    return null;
  };
  updatePlanning = async (planningId: number, planning: number) => {
    return null;
  };
  deletePlanning = async (planningId: number) => {
    return null;
  };
}
export default PlanningRepository;
