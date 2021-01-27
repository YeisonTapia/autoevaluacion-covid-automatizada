const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: false, defaultViewport: null });
  const page = await browser.newPage();
  

	
  await page.goto('https://alissta.gov.co/AutoEvaluacionCOVID/COVID19');

  const signIn = await page.evaluate(() => {
  	let chooseDocument = document.querySelector("#DocumentoUsuario").selectedIndex = 1;
  	let setDocument = document.querySelector("#numDocumentoUsuario").value = "";
  	let searchUser = document.querySelector("#BuscarUsuario").click();

  	return {
  		chooseDocument,
  		setDocument,
  		searchUser,
  	}
  });

  await page.waitForSelector("#Empresa");
  await page.select("#Empresa", "900934988*NI");
  await page.type("#ClaveAcceso", "");
  await page.click("button[class=login-usuario-app]");

  await page.waitForSelector("#botAutorizacion .botonactive");

  await page.$eval("#botAutorizacion .botonactive", elem => elem.click());

  const checkNow = await page.evaluate(() => {
  	let items = [
		"#pregunta_1_2", 
		"#pregunta_2_3", 
		"#pregunta_4_1", 
		"#pregunta_5_2", 
		"#pregunta_6_2", 
		"#pregunta_7_1", 
		"#pregunta_8_1", 
		"#pregunta_9_1", 
		"#pregunta_10_1", 
		"#pregunta_11_2", 
		"#pregunta_12_1", 
		"#pregunta_13_2", 
		"#pregunta_14_2",
		"#pregunta_15_2"
	];

	items.map((item) => document.querySelector(item).checked = true);
	let temperature = document.querySelector("#pregunta_3_1").value = "36.2"

	return {
		temperature,
	}

  })

  await page.waitForSelector("#btnGuardar");
  await page.click("#btnGuardar");


  await page.waitFor(2000);
  const submitAll = await page.evaluate(() => {
  	let submitForm = document.querySelector(".confirm").click();

  	return {
  		submitForm,
  	}
  });


  await page.waitFor(3000);
  await page.screenshot({path: 'resultado.png'});
  await browser.close();
})();