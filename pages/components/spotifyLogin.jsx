// import { getProviders, signIn } from "next-auth/react";

function SpotifyLogin({ providers }) {
    console.log(providers);
    return (

        <div>
            //     <img className="w-5 mb-5" src="https://links.papareact.com/9xl" alt="" />
            {/* {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className=" bg-[#18D860] text-white p-5 rounded-full" onClick={
                        () => signIn(provider.id, { callbackUrl: "/" })
                    }>Login with {provider.name} </button>
                </div>
            ))}; */}

        </div>


    )
};

export default SpotifyLogin;

export async function getServerSideProps() {
    const providers = await getProviders();
    console.log("Providers", providers)

    return {
        props: {
            providers,
        }
    }
}