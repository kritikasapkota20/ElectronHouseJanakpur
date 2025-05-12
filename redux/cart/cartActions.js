import {
  ADD_TO_CART,
  FETCH_CART_DATA,
  CLEAR_CART_DATA,
  DECREASE_CART_ITEM,
  DELETE_CART_ITEM,
  CART_UPDATE_STATE,
  ADD_TO_COMPARE
} from './cartTypes'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import Router from 'next/router'
import { ToastContainer, toast } from "react-toastify";

export const add_to_cart = () => {
  return {
    type: ADD_TO_CART,
  }
}

export const decrease_cart_item = () => {
  return {
    type: DECREASE_CART_ITEM,
  }
}

export const add_to_compare = () => {
  return {
    type: ADD_TO_COMPARE
  }
}

export const updateCart = stateData => {
  return {
    type: CART_UPDATE_STATE,
    payload: stateData,
  }
}

export const remove_item = () => {
  return {
    type: 'REMOVE_ITEM',
  }
}

export const updateCart1 = stateData => {
  return {
    type: 'UPDATE_CART1',
    payload: stateData,

  }
}

export const toggleDarkMode = mode => {
  return {
    type: 'FETCH_DARK_MODE',
    payload: mode,
  }
}

export const fetchUpdateCart1 = (stateData1) => {
  return dispatch => {
    dispatch(updateCart1(!stateData1))
  }
}

export const fetchToggleDarkMode = (mode) => {
  return dispatch => {
    dispatch(toggleDarkMode(!mode))
  }
}

export const fetchUpdateCart = stateData => {
  return dispatch => {
    dispatch(updateCart(!stateData))
  } 
}


export const fetchAddToCart = (cartData) => {
  return dispatch => {
    var cart = JSON.parse(localStorage.getItem("myCart"))
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];

    if (cart.length !== 0) {
      const productsId = cart.map((item) => item.productId + "");
      if (productsId.includes(cartData.productId)) {
        const index = productsId.indexOf(cartData.productId);
        cart[index] = {
          productId: cartData.productId,
          title: cartData.title,
          price: cartData.price,
          image: cartData.image,
          quantity: cart[index].quantity + 1,
          adminId: cartData.adminId,
          slug: cartData.slug,
        };
        localStorage.setItem("myCart", JSON.stringify(cart));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "item added to cart",
        });
        dispatch(add_to_cart())

      } else {
        localStorage.setItem("myCart", JSON.stringify([...cart, cartData]));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "item added to cart",
        });

        dispatch(add_to_cart())

      }
    } else {
      localStorage.setItem("myCart", JSON.stringify([cartData]));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "item added to cart",
      });
      dispatch(add_to_cart())

    }

  }
}

export const fetchRemoveItem = (productId) => {
  return dispatch => {
    var cart = JSON.parse(localStorage.getItem("myCart"))
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];
    if (cart.length !== 0) {
      const productsId = cart.map((item) => item.productId + "");
      if (productsId.includes(productId)) {
        const index = productsId.indexOf(productId);
        cart.splice(index, 1);
        localStorage.setItem("myCart", JSON.stringify(cart));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "item removed from cart",
        });
      }
    }
  }
}

export const fetchDecreaseCartItem = (cartData) => {
  return dispatch => {
    var cart = JSON.parse(localStorage.getItem("myCart"))
      ? JSON.parse(localStorage.getItem("myCart"))
      : [];

    if (cart.length !== 0) {
      const productsId = cart.map((item) => item.productId + "");
      if (productsId.includes(cartData.productId)) {
        const index = productsId.indexOf(cartData.productId);
        cart[index] = {
          productId: cartData.productId,
          title: cartData.title,
          price: cartData.price,
          adminId: cartData.adminId,
          slug: cartData.slug,
          image: cartData.image,
          quantity: cart[index].quantity <= 1 ? 0 : cart[index].quantity - 1,
        };
        localStorage.setItem("myCart", JSON.stringify(cart));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "item decreased from cart",
        });

        dispatch(decrease_cart_item())

      } else {
        localStorage.setItem("myCart", JSON.stringify([...cart, cartData]));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "item decreased from cart",
        });

        dispatch(decrease_cart_item())
      }
    } else {
      localStorage.setItem("myCart", JSON.stringify([cartData]));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "item decreased from cart",
      });

      dispatch(decrease_cart_item())

    }

  }
}



export const fetchRemoveItemFromCompare = (productId) => {
  return dispatch => {
    var items = JSON.parse(localStorage.getItem("compare"))
      ? JSON.parse(localStorage.getItem("compare"))
      : [];

    if (items.length !== 0) {
      const productsId = items.map((item) => item._id + "");
      if (productsId.includes(productId)) {
        const index = productsId.indexOf(productId);
        items.splice(index, 1);
        localStorage.setItem("compare", JSON.stringify(items));
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "item removed from cart",
        });
      }
    }
  }
}

