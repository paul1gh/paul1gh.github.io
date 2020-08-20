var CurrentAPI = function() {
    this.url = 'https://api.current-rms.com/api/v1/';
    this.key = 'LVq48BKq4YzvrG4MMiU_';
    this.subdomain = 'dxd';
    this.options = {
      'method': 'get',
      'validateHttpsCertificates': false,
      'headers': {
        'X-SUBDOMAIN': this.subdomain,
        'X-AUTH-TOKEN': this.key
      }
    };
    
    /* =======================================
    * @function request
    * ======================================= */
    this.request = function(params) {    
      var response = UrlFetchApp.fetch(this.url + params, this.options);
      var data = response.getContentText();
      return JSON.parse(data);
    }
  
    /* =======================================
    * @function getAllStockTransactions
    * ======================================= */
    this.getAllStockTransactions = function(dateStart, dateEnd) {
      var transactions = [];
      
      var url = 'stock_transactions?q[g][0][transaction_at_gteq]=' + dateStart.toISOString() + '&q[g][1][transaction_at_lt]=' + dateEnd.toISOString() + '&q[m]=and';
      var page = 1;
      var max = 999999999999999;
      var count = 0;
      
      while (count < max) {
        var data = this.request(url + '&per_page=100&page=' + page);
        
        count += data.meta.row_count;
        max = data.meta.total_row_count;
        page ++;
        
        transactions = transactions.concat(data.stock_transactions);
      }
      
      return transactions;
    }
  }
  
  // Instanciation
  var api = new CurrentAPI();