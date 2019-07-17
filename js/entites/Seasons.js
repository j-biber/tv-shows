class Season {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
    getData () {
        return `${this.startDate} - ${this.endDate}`
    }
}

export default Season;