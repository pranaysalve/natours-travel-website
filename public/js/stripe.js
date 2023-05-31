import axios from 'axios';
const stripe = Stripe('sk_test_51NDXn8SJHVrJAXUgm5lxzech4IBvJaul0iGHk9gPOl9ERQajc0lFEJxJG1Fk3g6wBuMCAN3CJyYMQCRiW06ZcLgP00bZhIMWU2');

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