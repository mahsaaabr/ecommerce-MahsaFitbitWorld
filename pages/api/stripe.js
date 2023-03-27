import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


export default async function handler(req, res) {
  if (req.method ===  'POST') {
    console.log(req.body)
    try {
        const params={
            //add some additional properties that we need to pass through params
            submit_type:'pay',
            mode:'payment',
            payment_method_types:['card'],
            billing_address_collection:'auto',
            shipping_options:[
                {shipping_rate:'shr_1Mos6jEgZa80Poj81K1XGt6X'},
                {shipping_rate:'shr_1MosDPEgZa80Poj8uSpJ3NqO'},
            ],
            line_items: req.body.map((item)=>{
                const img = item.image[0].asset._ref;
                const newImage= img.replace('image-','https://cdn.sanity.io/images/lqzl8x8n/production/').replace('-png','.png');
                console.log('Image',newImage)

                return{
                    price_data:{
                        currency:'usd',
                        product_data:{
                            name:item.name,
                            images:[newImage],
                        },
                        unit_amount:parseFloat((item.price*100).toFixed(2)),
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1,
                    },
                    quantity:item.quantity,
                }
            }),
            
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          }
      // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
        res.json({id: session.id});
        
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}