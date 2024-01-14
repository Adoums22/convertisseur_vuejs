Vue.createApp({
    data() {
        return {
          amount: '1.00',
          from: '',
          to: '',
          error: '',
          shows: '',
          currencies: {}
        };
      },
      methods: {
        swapCurrencies() {
          const temp = this.from;
          this.from = this.to;
          this.to = temp;
        },
        async fetchCurrencies() {
          try {
              const host = 'api.frankfurter.app';
              const response = await fetch(`https://${host}/currencies`);
              const data = await response.json();
              this.currencies = data;
              return data; 
          } catch (error) {
              const e = "Vous n'êtes pas connecté à internet";
              this.error = e;
              console.error(e);
              throw error; 
          }
        },
        async search() {
          if (!this.amount || isNaN(this.amount)) {
            this.error = "Veuillez entrer un montant valide";
            return;
          }
          
          if (this.amount <= 0) {
            this.error = "Veuillez saisir un montant supérieur à 0";
            return;
          }

          this.error = "";
    
          try {
            const host = 'api.frankfurter.app';
            const response = await fetch(`https://${host}/latest?amount=${this.amount}&from=${this.from}&to=${this.to}`);
            const data = await response.json();
            this.shows = data;
          } catch (error) {
            const e = "Vous n'êtes pas connecté à internet";
            this.error = e;
            console.error(e);
          }
        },
      },
      async mounted() {
        try {
            const fetchedCurrencies = await this.fetchCurrencies();
            this.from = Object.keys(fetchedCurrencies)[0];
            this.to = Object.keys(fetchedCurrencies)[1];
        } catch (error) {
            console.error("Erreur lors du chargement des devises", error);
        }
    }
  }).mount("#app");
  