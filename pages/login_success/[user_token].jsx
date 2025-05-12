import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

const UserToken = () => {
  const router = useRouter()
  const { user_token } = router.query
  Cookies.set('user-token', user_token)
    const token = Cookies.get('user-token') ? Cookies.get('user-token') : null
    if (token?.length > 10) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user-token': token,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.login == true) {
            Cookies.set('user-detail', JSON.stringify(data.userDetail))
            router.push('/')
          }
          else if(data.login == false) { 
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
              title: data.message,
            });
            router.push('/login')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  return (
    <>
      <div className="relative flex lg:w-[50%] w-[100%] mx-auto my-4 flex-col sm:flex-row sm:items-center bg-white shadow-lg rounded-md py-5 pl-6 pr-8 sm:pr-6 backdrop-filter backdrop-blur-lg bg-opacity-25">
        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
          <div className="text-green-500">
            <svg
              className="w-6 sm:w-5 h-6 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="text-sm font-medium ml-3">Login Success.</div>
        </div>
        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4 flex items-center">
          Your Login was Successful. Redirecting to Profile !!!   <div className="spinner"></div>
        </div>
      
      </div>
    </>
  )
}
export default UserToken
