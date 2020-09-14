const app = new Vue({
  el: '#app',
  async created() {
    this.timezones.list = await fetch('http://worldtimeapi.org/api/timezone').then(r => r.json())
    this.dates.start.date = this.today
    this.dates.end.date = this.today
  },
  data: {
    title: '',
    location: '',
    notes: '',
    dates: {
      allDay: false,
      start: {
        date: '',
        time: ''
      },
      end: {
        date: '',
        time: ''
      }
    },
    timezones: {
      list: [],
      chosen: ''
    }
  },
  methods: {
    // copyOutput() {
    //   console.log('copying output')
    //   const copyText = document.getElementById("output")
    //   console.log(copyText)
    //   copyText.select();
    //   document.execCommand("copy");
    // }
  },
  computed: {
    output() {
      let url = 'https://www.google.com/calendar/render?action=TEMPLATE'
      url += `&text=${this.title}`
      if(!this.dates.allDay) {
        url += `&dates=${this.startDate}T${this.startTime}`
        url += `/${this.endDate}T${this.endTime}`
      } else {
        url += `&dates=${this.startDate}/${this.endDateWhenAllDay}`
      }
      if(this.timezones.chosen) {
        url += `&ctz=${this.timezones.chosen}`
      }
      if(this.location) url += `&location=${this.location}`
      if(this.notes) url += `&details=${this.notes}`
      return url
    },
    startDate() {
      return this.dates.start.date.split('-').join('')
    },
    endDate() {
      return this.dates.end.date.split('-').join('')
    },
    endDateWhenAllDay() {
      if(this.dates.end.date) {
        const date = new Date(this.dates.end.date)
        date.setDate(date.getDate() + 1)
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${ye}${mo}${da}`
      }
    },
    startTime() {
      return this.dates.start.time.split(':').join('') + '00'
    },
    endTime() {
      return this.dates.end.time.split(':').join('') + '00'
    },
    today() {
      const date = new Date()
      const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
      const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
      const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
      return `${ye}-${mo}-${da}`
    }
  }
})
