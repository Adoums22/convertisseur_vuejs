Vue.createApp({
    data() {
        return {
          amount: '',
          from: '',
          to: '',
          error: '',
          shows: '',
          currencies: {}
        };
      },
      methods: {
        async fetchCurrencies() {
            try {
              const host = 'api.frankfurter.app';
              const response = await fetch(`https://${host}/currencies`);
              const data = await response.json();
              this.currencies = data;
            } catch (error) {
              const e = "Vous n'êtes pas connecté à internet";
              this.error = e;
              console.error(e);
            }
          },
        async search() {
          if (!this.amount || isNaN(this.amount)) {
            this.error = "Veuillez entrer un montant valide";
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
      mounted() {
        this.fetchCurrencies(); // Pour récupérer la liste des devises au chargement de la page
      }
  }).mount("#app");
  