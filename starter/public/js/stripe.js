import axios from 'axios';
const stripe = Stripe('pk_test_51K3hrnDgQnXNJCTEtqOiLnhkEBb1N2cc6OIhMDPjHeaqv0EEsNR9dNlcDkFNo3r2N22KqN5yUijZyqccvn7QZdEB009aTscE9n');

export const bookTour = async (tourId) => {

    try {
        
        // 1°) Get checkout session from API
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)

        // 2°) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });


    } catch (err) {

    }
    
};