let CoinData = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

async function fetchData(url) {
    try {
      // Make the fetch request
      let response = await fetch(url);
  
      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse the JSON from the response
      let data = await response.json();
  
      // Return the data
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error so the caller knows something went wrong
    }
  }
  
  // Example usage
  fetchData(CoinData)
    .then(data => {
      console.log('Data fetched successfully:', data);
      displayData(data);
    })
    .catch(error => {
      console.error('Error in fetchData:', error);
    });

function displayData(data) {
    console.log("arbaj ansari");
    data.forEach(item => {
        let symbolUpperCase = item.symbol.toUpperCase();
        let price_change_percentage_24h = parseFloat(item.price_change_percentage_24h).toFixed(2);
        if(price_change_percentage_24h < 0)
            {
                document.getElementById("coin_listing").innerHTML += `<div id="coin_row">
                <div class="box1"><img class="cryptologo" src="${item.image}"><p class="coin_details">${item.name}</p></div>
                <div class="box2"><p class="coin_details">${symbolUpperCase}</p></div>
                <div class="box3"><p class="coin_details">${item.current_price}</p></div>
                <div class="box4"><p class="coin_details">${item.total_volume}</p></div>
                <div class="box5"><p style="color:red" class="coin_detailsprice">${price_change_percentage_24h}%</p></div>
                <div class="box6"><p class="coin_details">Mkr Cap: ${item.market_cap}</p></div>
            </div>`
            } else {
                document.getElementById("coin_listing").innerHTML += `<div id="coin_row">
                <div class="box1"><img class="cryptologo" src="${item.image}"><p class="coin_details">${item.name}</p></div>
                <div class="box2"><p class="coin_details">${symbolUpperCase}</p></div>
                <div class="box3"><p class="coin_details">${item.current_price}</p></div>
                <div class="box4"><p class="coin_details">${item.total_volume}</p></div>
                <div class="box5"><p style="color:green" class="coin_detailsprice">${price_change_percentage_24h}%</p></div>
                <div class="box6"><p class="coin_details">Mkr Cap: ${item.market_cap}</p></div>
            </div>`

            }
    });
}

document.getElementById('input_search').addEventListener('keyup', function(event) {
    const searchTerm = event.target.value;
    updateTable(searchTerm);
});

function updateTable(searchTerm) {
    fetch(CoinData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filteredData = data.filter(item => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   item.symbol.toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Clear the table body
        document.getElementById("coin_listing").innerHTML = '';

        displayData(filteredData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function MarketCap(){
    fetch(CoinData)
    .then(response => {
        return response.json();
    }).then(data => {
        let sortedDataCap = data.sort((a,b) => {
            return b.market_cap - a.market_cap;
        })

        document.getElementById("coin_listing").innerHTML = '';

        displayData(sortedDataCap);
    })
}



function Percentage(){
    fetch(CoinData)
    .then(response => {
        return response.json();
    }).then(data => {
        let sortedDataPer = data.sort((a,b) => {
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        })

        document.getElementById("coin_listing").innerHTML = '';

        displayData(sortedDataPer);
    })
}