

const reducer =(state,action)=>{

    switch(action.type){

        case 'CLEAR_CART':
            return {
                ...state,
                cart:[],
            }
        case 'REMOVE':{
            const newCart = state.cart.filter((item) =>item.id!==action.payload );
            return{
                ...state,
                cart:newCart
            }
        }
        case 'ADD_ITEM':{
            let tempCart=state.cart.map((cartItem)=>{
                if(cartItem.id === action.payload){
                    return {
                        ...cartItem,
                        amount:cartItem.amount++
                    }
                }
                return cartItem;
            })
            return {...state,cart:tempCart}
            
        }
        case 'DELETE_ITEM':{
            let tempCart=state.cart.map((cartItem)=>{
                if(cartItem.id === action.payload){
                    return {
                        ...cartItem,
                        amount:cartItem.amount--
                    }
                }
                return cartItem;
            }).filter((item)=>item.amount>0 );
            return {...state,cart:tempCart}
            
        }
        case 'GET_TOTAL':{
            let {total,amount}= state.cart.reduce( (cartTotal,cartItem)=>{
                const {price,amount}= cartItem;
                const itemTotal = price * amount;

                cartTotal.total+=itemTotal;
                cartTotal.amount+=amount;
                return cartTotal;
            },{
                total:0,
                amount:0
            })
            total=parseFloat(total.toFixed(2));

            return {...state,total,amount}
        }

        

        }
}

export default reducer;
