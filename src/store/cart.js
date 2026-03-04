import { defineStore } from "pinia";

export const cartStore = defineStore( 'cart', {
   state: () => ({
    // 전역상태관리의 변수값은 화면새로고침시 전체 리셋 -> 로컬스토리지(모든 값이 문자열로 저장)에 저장
    totalQuantity: parseInt(localStorage.getItem("totalQuantity")) || 0,
    // 없으면 빈 배열, 있으면 객체를 꺼내오겠다.
    // 문자열 형태로 갖고왔다가 쓸 때는 객체로 파싱해줘야 한다.
    productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || [],
    
   }),
    actions:{
        addCart(product){
            this.totalQuantity += product.productCount;
            localStorage.setItem("totalQuantity", this.totalQuantity);
            // 기존에 담은 상품이면 거기서 상품 개수가 추가되고,
            const existProduct = this.productsInCart.find(p=>p.productId === product.productId);
            if(existProduct){
                existProduct.productCount += product.productCount;
                // 새로 담은 상품이면 새로 상품 추가
            } else {
                this.productsInCart.push(product);
            }
            
            localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
        },
        clearCart(){
            // 로컬스토리지에 담긴 값들은 지우고, 빈 배열, 0으로 세팅
            localStorage.removeItem("productsInCart");
            localStorage.removeItem("totalQuantity");
            this.productsInCart = [];
            this.totalQuantity = 0;
        }
    },
    getters:{
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
}
)