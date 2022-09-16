const data = [
	{
		id: 1,
		img: "https://product.hstatic.net/1000360022/product/dsc02160_e52d23a2718b4b73996605f91d8d1d24_master.jpg",
		name: "Monalisa Pixel T-Shirt",
		price: 20,
	},
	{
		id: 2,
		img: "https://product.hstatic.net/1000360022/product/dsc01776_201a99e1a0034f4bb18134cee803021d_master.jpg",
		name: "Short Shirt A6",
		price: 25,
	},
	{
		id: 3,
		img: "https://product.hstatic.net/1000360022/product/dsc01757_2a85602760934d1b9e669a11e37797d8_master.jpg",
		name: "Pink Polo Shirt",
		price: 20,
	},
	{
		id: 4,
		img: "https://product.hstatic.net/1000360022/product/dsc01426_029b801ded28414db914c11682bebc49_master.jpg",
		name: "Bamboo Short Shirt",
		price: 25,
	},
	{
		id: 5,
		img: "https://product.hstatic.net/1000360022/product/dsc00315_6b4680064b2a40e0aecd6fa78e32937b_master.jpg",
		name: "Gratifi Summer Shirt",
		price: 25,
	},
	{
		id: 6,
		img: "https://product.hstatic.net/1000360022/product/dsc09521_33a65665a9bb409f9c30f30d783688ef_master.jpg",
		name: "Bamboo Short Shirt",
		price: 25,
	},
	{
		id: 7,
		img: "https://product.hstatic.net/1000360022/product/dsc08367_9d81a8a6e8554248a32c8675bcdad2a0_master.jpg",
		name: "Bamboo Short Shirt",
		price: 30,
	},
	{
		id: 8,
		img: "https://product.hstatic.net/1000360022/product/dsc07729_d54d58927fee4951ba7a8b6d1afbb1e4_master.jpg",
		name: "Bamboo Short Shirt",
		price: 30,
	},
	{
		id: 9,
		img: "https://product.hstatic.net/1000360022/product/dsc07501_retouch_eb910b664a9d4d9c8a4ba57a65f7b4c8_master.jpg",
		name: "Bamboo Short Shirt",
		price: 26,
	},
	{
		id: 10,
		img: "https://product.hstatic.net/1000360022/product/dsc07340_3a1e85c3ecde4ba5a37f2eec520e3179_master.jpg",
		name: "Bamboo Short Shirt",
		price: 30,
	},
	{
		id: 11,
		img: "https://product.hstatic.net/1000360022/product/dsc07340_3a1e85c3ecde4ba5a37f2eec520e3179_master.jpg",
		name: "Bamboo Short Shirt",
		price: 45,
	},
	{
		id: 12,
		img: "https://product.hstatic.net/1000360022/product/dsc06941_c01ea8c756864cb795c5ff74710179ac_master.jpg",
		name: "Bamboo Short Shirt",
		price: 35,
	},
];

data.forEach((value) => {
	console.log(`
    {
        "title": "${value.name}",
        "img": "${value.img}",
        "categories": ["tshirt"],
        "price": ${value.price},
        "instock": [
            {
                "color": "yellow",
                "size": [
                    {
                        "name": "m",
                        "quantity": 10
                    },
                    {
                        "name": "l",
                        "quantity": 10
                    },
                    {
                        "name": "xl",
                        "quantity": 10
                    }
                ]
                
            }
        ]
    }
    `);
});
