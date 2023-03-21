import { getProviders, signIn } from "next-auth/react";
import React from 'react';


function login({ providers }) {
    return (
        <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
            <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />

            {Object.values(providers).map((provider) => (
                <div>
                    <button className="bg-[#18D860] text-white p-5 rounded-full hover:opacity-50" onClick={() => signIn(provider.id, { callbackUrl: "/" })}> Login with {provider.name} </button>
                </div>
            ))}

        </div>
    )
}

export default login;

export async function getServerSideProps() {
    const providers = await getProviders();
    const data = `Data from server: ${Date.now()}`;

    return {
        props: {
            providers,
            initialData: data,
        },
    }
}