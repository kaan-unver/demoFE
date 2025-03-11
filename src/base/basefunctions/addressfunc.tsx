class AddresFunc {
    setNamesOfAddress(tenant: any) {
        let cities = JSON.parse(localStorage.getItem('cities') || '');
        tenant.cityName = cities.filter((item: any) => tenant.cityId === item.id)[0].name;
        let counties = JSON.parse(localStorage.getItem('counties') || '');
        tenant.countyName = counties.filter((item: any) => tenant.countyId === item.id)[0].name;
        let hometowns = JSON.parse(localStorage.getItem('hometowns') || '');
        tenant.hometownName = hometowns.filter((item: any) => tenant.hometownId === item.id)[0].name;
    }
}

export default new AddresFunc();
