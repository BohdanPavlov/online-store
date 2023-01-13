import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
	constructor() {
		this._types = [];
		this._brands = [];
		this._devices = [];
		this._selectedType = {};
		this._selectedBrand = {};
		this._page = 1;
		this._totalCount = 0;
		this._limit = 2;
		makeAutoObservable(this);
	}

	get types() {
		return this._types;
	}

	setTypes(types) {
		this._types = types;
	}

	get brands() {
		return this._brands;
	}

	setBrands(brands) {
		this._brands = brands;
	}

	get devices() {
		return this._devices;
	}

	setDevices(devices) {
		this._devices = devices;
	}

	get selectedType() {
		this.setPage(1);
		return this._selectedType;
	}

	setSelectedType(type) {
		this._selectedType = type;
	}

	get selectedBrand() {
		this.setPage(1);
		return this._selectedBrand;
	}

	setSelectedBrand(brand) {
		this._selectedBrand = brand;
	}

	get page() {
		return this._page;
	}

	setPage(page) {
		this._page = page;
	}

	get totalCount() {
		return this._totalCount;
	}

	setTotalCount(count) {
		this._totalCount = count;
	}

	get limit() {
		return this._limit;
	}

	setLimit(limit) {
		this._limit = limit;
	}
}
