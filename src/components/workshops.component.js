export default {}

export function WorkshopsCtrl(workshopsService) {
    const vm = this;
    
    Object.assign(vm, {
        $onInit
    });
    
    function $onInit() {
        workshopsService.getWorkshops()
            .then((workshops) => vm.workshops = workshops)
            .catch((errors) => vm.errors = errors);
    }
}
