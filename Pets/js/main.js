'use strict';



class Pet {
	constructor (color, price) {
		this.color = color;
		this.price = price;
	}

	getFluffy (fluffy) {
		let isFluffy = (fluffy === 0) ? false : true;
		return isFluffy;
	}
}

class Dog extends Pet {
	constructor (name, color, price) {
		super(color, price);
		this.name = name;
	}
}


class Cat extends Pet {
	constructor (name, color, price, isFluffy) {
		super(color, price);
		this.name = name;
		this.isFluffy = this.getFluffy(isFluffy);
	}
}


class Hamster extends Pet {
	constructor (color, price, isFluffy) {
		super(color, price, isFluffy);
		this.isFluffy = this.getFluffy(isFluffy);
	}
}



class PetShopModel {

	constructor () {
		this.allPets = [];
				console.log(this.allPets);
	}

	addDog (name, color, price) {
		let newDog = new Dog(name, color, price);
		this.allPets.push(newDog);
	}

	addCat (name, color, price, isFluffy) {
		let newCat = new Cat(name, color, price, isFluffy);
		this.allPets.push(newCat);
	}

	addHamster ( color, price, isFluffy) {
		let newHamster = new Hamster(color, price, isFluffy);
		this.allPets.push(newHamster);
	}

	getCats () {
		let cats = [];
		this.allPets.forEach((pet) => {
			if (pet instanceof Cat) {
				cats.push(pet);
			}
		});
		return cats;
	}

	getPetsGreaterAveragePrice() {
		let allPets = this.allPets;
		let sumPriceOfPets = getSumPriceOfPets();
		let averagePriceOfPets = getAveragePriceOfPets();
		let moreExpensiveHalfOfPets = getMoreExpensiveHalfOfPets();
		return moreExpensiveHalfOfPets;

		function getSumPriceOfPets () {
			let sumPriceOfPets = 0;
			allPets.forEach((pet) => {
				sumPriceOfPets += pet.price;
			})
			return sumPriceOfPets;
		}

		function getAveragePriceOfPets () {
			let averagePriceOfPets = 0
			averagePriceOfPets = sumPriceOfPets/allPets.length;
			return averagePriceOfPets;
		}

		function getMoreExpensiveHalfOfPets () {
			let moreExpensiveHalfOfPets = [];
			allPets.forEach((pet) => {
				if (averagePriceOfPets < pet.price) {
					moreExpensiveHalfOfPets.push(pet);
				}
			})
			return moreExpensiveHalfOfPets;
		}
	}

	getPetsByFluffyOrColor (isFluffy = true, color = 'white') {
		let fluffyPets = this.getPetsByFluffy(isFluffy);
		let petsByColor = this.getPetsByColor(color);
		let	allPets = [];
		let uniquePets = [];
		allPets.concat(fluffyPets, petsByColor).forEach((pet) => {
			if (!uniquePets.includes(pet)) {
				uniquePets.push(pet);
			}
		})
		return uniquePets;
	}

	getPetsByFluffy (isFluffy) {
		let allPets = this.allPets;
		let fluffyPets = [];

		allPets.forEach((pet) => {
			if (pet.isFluffy === isFluffy) {
				fluffyPets.push(pet);
			}
		})
		return fluffyPets;
	}

	getPetsByColor (color) {
		let allPets = this.allPets;
		let petsByColor = [];

		allPets.forEach((pet) => {
			if (pet.color === color) {
				petsByColor.push(pet);
			}
		})
		return petsByColor;
	}

}


class PetShopController {
	constructor () {
		this.petShopView = new PetShopView();
		this.petShopModel = new PetShopModel();

		this.petShopModel.addCat('Coco', 'white-brown', 316, 0);
		this.petShopModel.addCat('Chloe', 'white-orange', 320, 0);
		this.petShopModel.addCat('Lucy', 'white-black', 240, 0);
		this.petShopModel.addCat('Milo', 'white', 300, 1);
		this.petShopModel.addCat('Tiger', 'black', 210, 3);
		this.petShopModel.addHamster('white', 120, 0);
		this.petShopModel.addHamster('brown', 110, 1);
		this.petShopModel.addHamster('white-black', 120, 0);
		this.petShopModel.addHamster('white', 320, 0);
		this.petShopModel.addHamster('black', 490, 0);
		this.petShopModel.addDog('Coco', 'white-brown', 218);
		this.petShopModel.addDog('Simba', 'white-orange', 232);
		this.petShopModel.addDog('Oscar', 'white-black', 150);
		this.petShopModel.addDog('Sam', 'white', 310);
		this.petShopModel.addDog('Molly', 'black', 210);
		
		this.createListsItems = new CreateListItems(this.petShopModel);
	}

	AddNewPet () {
		new AddNewPet(this.petShopModel);
	} 

	RemovePets () {
		new RemovePets(this.petShopModel);
	} 
}

class CreateListItems  {
	constructor (petShopModel) {
		this.firstListContent = petShopModel.getCats(); 
		this.secondListContent = petShopModel.getPetsGreaterAveragePrice();
		this.thirdListContent = petShopModel.getPetsByFluffyOrColor();
		this.allPetsList = petShopModel.allPets;

		this.getLists (this.firstListContent, this.secondListContent, this.thirdListContent);
	}

	getLists () {
		let firstList = fillInList(this.firstListContent, 'firstList');
		let secondList = fillInList(this.secondListContent, 'secondList');
		let thirdList = fillInList(this.thirdListContent, 'thirdList');
		let allPetsList = fillInList(this.allPetsList, 'allPetsList');

		function fillInList(arrayPets, listId) {
			let listItem;
			let listItemPetKind;
			let list = document.getElementById(listId);
			list.innerHTML = ''; //remove old list items
			arrayPets.forEach((pet) => {
				listItem = document.createElement('li');
				listItem.setAttribute('class', 'list-group-item');
				listItem.textContent += `${pet.__proto__.constructor.name} -  `;
				for (let key in pet) {
					listItem.textContent += ` ${key}: ${pet[key]}; `; 
				}
				list.appendChild(listItem);
			})
		}
	}
}



class AddNewPet {
	constructor (petShopModel) {
		this.dataFromHTML = this.getDataFromHTML();
		this.petData = this.getTypesConversion(this.dataFromHTML);
		this.addPet = this.checkingForInsert(petShopModel, this.petData);
		new CreateListItems(petShopModel);
	}
	
	getDataFromHTML () {
		let dataFromHTML = {};
		dataFromHTML.inputPetKind = document.querySelector('#pet_tab>li>a.active').getAttribute('id');
		if (dataFromHTML.inputPetKind === 'cat') {
			dataFromHTML.inputPetName = document.querySelector(`#${dataFromHTML.inputPetKind}_name`).value;
			dataFromHTML.inputPetColor = document.querySelector(`#${dataFromHTML.inputPetKind}_color`).value;
			dataFromHTML.inputPetPrice = document.querySelector(`#${dataFromHTML.inputPetKind}_price`).value;
			dataFromHTML.inputPetFluffy = document.querySelector(`#${dataFromHTML.inputPetKind}_fluffy`).selectedIndex;
		}
		if (dataFromHTML.inputPetKind === 'dog') {
			dataFromHTML.inputPetName = document.querySelector(`#${dataFromHTML.inputPetKind}_name`).value;
			dataFromHTML.inputPetColor = document.querySelector(`#${dataFromHTML.inputPetKind}_color`).value;
			dataFromHTML.inputPetPrice = document.querySelector(`#${dataFromHTML.inputPetKind}_price`).value;
		}
		if (dataFromHTML.inputPetKind === 'hamster') {
			dataFromHTML.inputPetColor = document.querySelector(`#${dataFromHTML.inputPetKind}_color`).value;
			dataFromHTML.inputPetPrice = document.querySelector(`#${dataFromHTML.inputPetKind}_price`).value;
			dataFromHTML.inputPetFluffy = document.querySelector(`#${dataFromHTML.inputPetKind}_fluffy`).selectedIndex;
		}
		return dataFromHTML;
	}

	getTypesConversion (dataFromHTML) {
			dataFromHTML.inputPetPrice = Number(dataFromHTML.inputPetPrice);
			return dataFromHTML;
		}

	checkingForInsert (petShopModel, petData) {
		if (petData.inputPetKind === 'cat') {
			petShopModel.addCat(petData.inputPetName, petData.inputPetColor, petData.inputPetPrice, petData.inputPetFluffy);
		};
		if (petData.inputPetKind === 'dog') {
			petShopModel.addDog(petData.inputPetName, petData.inputPetColor, petData.inputPetPrice);
		};
		if (petData.inputPetKind === 'hamster') {
			petShopModel.addHamster(petData.inputPetColor, petData.inputPetPrice, petData.inputPetFluffy);
		};
	}

	
}


class RemovePets {
	constructor (petShopModel) {
		this.allPets = petShopModel.allPets;
		this.removePets(this.allPets, petShopModel);
	}

	removePets (allPets, petShopModel) {
		let allPetsList = document.querySelector('#allPetsList');
		allPetsList.onclick = (event) => {
			let list = document.querySelectorAll('#allPetsList>li');
			for (let i = 0; i != list.length; ++i) {
				if (list[i] == event.target) {
				allPets.splice(i,1);
				new CreateListItems(petShopModel);
				}
			}
		}
	}
}



class PetShopView {
	constructor () {
		this.mainPageMarkup = new MainPageMarkup();
		this.modalFormMarkup = new ModalFormForEditing();
		this.renderPetShop = this.insertMarkupIntoHTML();
	}

	insertMarkupIntoHTML () {
		let connectHTML = document.querySelector('.PetShop');
		connectHTML.setAttribute('class', 'container PetShop');
		connectHTML.innerHTML = this.mainPageMarkup.mainPageTemplate + this.modalFormMarkup.modalFormTemplate;
	}

}

class MainPageMarkup {
	constructor () {
		this.mainPageTemplate = this.createMainPageTemplate();
	}
	createMainPageTemplate () {
		let mainPageTitle = 
			`<div class="row">
				<h1 class="col-lg-12 center">Pet Shop</h1>
			</div>`;
	
		let buttonEdit = 
			`<div class="row">
				<button type="button" class="m-auto font-weight-bold btn btn-outline-danger col-lg-1" data-toggle="modal" data-target=".bd-example-modal-lg">Edit</button>
			</div>`;

		let tableCats = 
			`<div class="row">
				<h4 class="col-lg-12">Cats:</h4>
				<ol class="m-auto" id="firstList">
				</ol>
			</div>`;

		let tablePetsPriceGreaterAverage = 
			`<div class="row">
				<h4 class="col-lg-12">Pets with price greater than average:</h4>
				<ol class="m-auto" id="secondList"></ol>
			</div>`;

		let tablePetsFluffyOrWhite = 
			`<div class="row">
				<h4 class="col-lg-12">Pets which fluffy or has white color:</h4>
				<ol class="m-auto" id="thirdList"></ol>
			</div>`;
	
		let mainPageTemplate = 
			`<div class="col-lg-12">
				${mainPageTitle}
				${buttonEdit}
				${tableCats}
				${tablePetsPriceGreaterAverage}
				${tablePetsFluffyOrWhite}
			</div>`;
		return mainPageTemplate;
	}
} 

class ModalFormForEditing {
	constructor () {
		this.modalFormTemplate = this.createModalFormTemplate();
	}
	createModalFormTemplate () {
		let modalFormTemplate = 
		`<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Edit Pet Shop</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<ul class="nav nav-tabs" id="pet_tab" role="tablist">
							<li class="nav-item">
								<a class="nav-link active " id="dog" data-toggle="tab" href="#dog-tab" role="tab" aria-controls="home" aria-selected="true">Add dog</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" id="cat" data-toggle="tab" href="#cat-tab" role="tab" aria-controls="profile" aria-selected="false">Add cat</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" id="hamster" data-toggle="tab" href="#hamster-tab" role="tab" aria-controls="contact" aria-selected="false">Add hamster</a>
							</li>
							<li class="nav-item text-center col-lg-3 ml-auto">
								<a class="nav-link" id="delete-tab" data-toggle="tab" href="#delete" role="tab" aria-controls="contact" aria-selected="false"  onclick="petShopController.RemovePets()" >Delete pet</a>
							</li>
						</ul>
						<div class="tab-content" id="pet_tab_content">
							<div class="tab-pane fade show active" id="dog-tab" role="tabpanel" aria-labelledby="home-tab">
								<form class="d-flex flex-column">
									<div class="form-group">
										<label for="dog" class="col-form-label">Pet name:</label>
										<input type="text" class="form-control pet_name" id="dog_name">
									</div>
									<div class="form-group">
										<label for="pet_color" class="col-form-label">Pet color:</label>
										<input type="text" class="form-control pet_color" id="dog_color">
									</div>
									<div class="form-group">
										<label for="pet_price" class="col-form-label">Pet price:</label>
										<input type="text" class="form-control pet_name" id="dog_price">
									</div>
								</form>
								<button type="" onclick="petShopController.AddNewPet()" class="btn btn-primary col-lg-12">Submit</button>
							</div>
							<div class="tab-pane fade" id="cat-tab" role="tabpanel" aria-labelledby="profile-tab">
								<form class="d-flex flex-column">
									<div class="form-group">
										<label for="pet_name" class="col-form-label">Pet name:</label>
										<input type="text" class="form-control pet_name" id="cat_name">
									</div>
									<div class="form-group">
										<label for="pet_color" class="col-form-label">Pet color:</label>
										<input type="text" class="form-control pet_color" id="cat_color">
									</div>
									<div class="form-group">
										<label for="pet_price" class="col-form-label">Pet price:</label>
										<input type="text" class="form-control pet_price" id="cat_price">
									</div>
									<div class="form-group">
										<label for="cat_fluffy">Pet fluffy:</label>
										<select class="form-control pet_fluffy" id="cat_fluffy">
											<option>0</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
										</select>
									</div>
								</form>
								<button type="" onclick="petShopController.AddNewPet()" class="btn btn-primary col-lg-12">Submit</button>
							</div>
							<div class="tab-pane fade" id="hamster-tab" role="tabpanel" aria-labelledby="contact-tab">
								<form class="form-group d-flex flex-column">
									<div class="form-group">
										<label for="pet_color" class="col-form-label">Pet color:</label>
										<input type="text" class="form-control pet_name" id="hamster_color">
									</div>
									<div class="form-group">
										<label for="pet_price" class="col-form-label">Pet price:</label>
										<input type="text" class="form-control pet_price" id="hamster_price">
									</div>
									<div class="form-group">
										<label for="hamster_fluffy">Pet fluffy:</label>
										<select class="form-control pet_price" id="hamster_fluffy">
											<option>0</option>
											<option>1</option>
											<option>2</option>
											<option>3</option>
										</select>
									</div>
								</form>
								<button type="" onclick="petShopController.AddNewPet()" class="btn btn-primary col-lg-12">Submit</button>
							</div>
							<div class="tab-pane fade" id="delete" role="tabpanel" aria-labelledby="contact-tab">
								<div class="row">
									<h4 class="col-lg-12 text-lg-center">All Pets</h4>
									<p class="col-lg-12 text-lg-center text-danger font-weight-bold">Click on the list item to remove</p>
									<ul class="col-lg-12" id="allPetsList"></ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;
		return modalFormTemplate;
	}
}

let petShopController = new PetShopController();











































// console.log(petShopView.createAddPetsForm());
	
// 	createAddPetsForm () {
// 		console.log(allPets.getCats());
// 		// createLabels ()
// 		// function createLabels () {
// 		// 	// let namesOfLabels = getNamesOfLabels(this.allPets);
// 		// 	// let labelsVariable;
// 		// 	// namesOfLabels.forEach((petName) => {
// 		// 	// })
// 		// getNamesOfLabels (this.allPets)

			// function 
		
	// getCharacteristicsOfPets () {
	// 	let allPets = this.allPets;
	// 	let kindOfPets = [];
	// 	let сharacteristicsAllPets = [];
	// 	allPets.forEach((pet) => {
	// 	let allCharacteristicsOfPets = [];
	// 		if (!kindOfPets.includes(pet.__proto__.constructor.name)) {
	// 		let сharacteristicsOfPet = [];
	// 			kindOfPets.push(pet.__proto__.constructor.name);
	// 			for(let key in pet) {
	// 				if (!сharacteristicsOfPet.includes(key))
	// 				сharacteristicsOfPet.push(key);
	// 			}
	// 			if (!allCharacteristicsOfPets.includes(сharacteristicsOfPet)){
	// 				allCharacteristicsOfPets.push(сharacteristicsOfPet);
	// 			}
	// 			if (!сharacteristicsAllPets.includes(allCharacteristicsOfPets)) {
	// 					сharacteristicsAllPets.push(allCharacteristicsOfPets);				
	// 			}
	// 		}
	// 	})
	// 			// console.log(сharacteristicsAllPets);
	// 			// console.log(kindOfPets);
	// 	return [kindOfPets, сharacteristicsAllPets];
	// }

	// getСharacteristicsOfPets () {
	// 	let allPets = this.allPets;
	// 	allPets.forEach((pet) => {
	// 		if(!pet )
	// 		if (!сharacteristicsOfPets.includes(сharacteristicsOfPet)) {
	// 			for(let key in pet) {
	// 				сharacteristicsOfPet.push(key);
	// 	console.log(сharacteristicsOfPet);
	// 			}
	// 		}
	// 	})
	// 	return сharacteristicsOfPets;
	// }
