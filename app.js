Vue.createApp({
  data() {
    return {
      q: "",
      error: "",
      shows: [],
    };
  },
  methods: {
    async search() {
      if (!this.q) {
        this.error = "Veuillez entrer une série";
        return;
      }

      this.error = "";

      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${this.q}`,
        );
        const data = await response.json();
        this.shows = data;
        this.q = "";
      } catch (error) {
        const e = "Vous n'êtes pas connecté à internet";
        this.error = e;
        console.error(e);
      }
    },
  },
}).mount("#app");
