import changePaneShowX from "./changePaneShowX"
import app from 'flarum/app'

app.initializers.add('irmmr-flarum-rtl-ext', () => {
    changePaneShowX()
})
