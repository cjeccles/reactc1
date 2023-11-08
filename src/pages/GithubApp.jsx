import React from 'react'




function UserDetails() {

    const {userData} = React.useContext(GithubAppContext)

    return (
        userData?.id && (
            <div className="mt-6">
                <div className="flex items-center gap-4">
                    <img src={userData.avatar_url} alt="User Image" id="image" className="w-16 h-16 rounded-full object-cover" />
                    <h3 className="text-gray-700 font-semibold" id="name">{userData.name}</h3>
                </div>

                <ul>
                    <li className="flex items-center gap-2">
                        <span>Bio</span>
                        <span id="bio">{userData.bio}</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <span>Public Repositories</span>
                        <span id="public_repos">{userData.public_repos}</span>
                    </li>
                </ul>
            </div>
        )
    )
}

function ErrorMessage() {
    const {errorMessage} = React.useContext(GithubAppContext)

    return (
        <span id="errorMessage" className="text-red-500 font-semibold my-2">{errorMessage}</span>
    )
}

function SearchForm() {
    const {setErrorMessage, setUserData} = React.useContext(GithubAppContext)

    function handleSubmit(event) {
        event.preventDefault()

        setErrorMessage("")
        setUserData({})

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        if (data.username == "" || !data.username) {
            setErrorMessage("Please enter a valid username")
            return
        }

        fetch(`https://api.github.com/users/${data.username}`)
            .then(response => response.json())
            .then(apiData => {
                console.log("entered the apiData section")

                if (apiData.message && apiData.message == "Not Found") {
                    setErrorMessage("Enter a valid username because this one was not found")
                    return
                }

                setUserData(apiData)

                console.log("Data", apiData)
            })

    }

    return (
        <form onSubmit={handleSubmit} id="search-form" className="flex items-center gap-3 w-full">
            <input type="search" name="username" placeholder="Enter Github Username" className="flex-grow border rounded-md p-2" />
            <button type="submit" className="bg-blue-400 text-white rounded px-4 py-2">Search</button>
        </form>
    )
}

const GithubAppContext = React.createContext({
    userData: {},
    setUserData: () => { },
    errorMessage: "",
    setErrorMessage: () => { }
})

function GithubAppProvider({ children }) {
    const [userData, setUserData] = React.useState({})
    const [errorMessage, setErrorMessage] = React.useState("")

    return (
        <GithubAppContext.Provider value={{ userData, setUserData, errorMessage, setErrorMessage }}>
            {children}
        </GithubAppContext.Provider>
    )
}

export default function GithubApp() {


    return (
        <GithubAppProvider>
            <div className="grid place-items-center max-w-md mx-auto h-96">
                <div className="w-full">
                    <SearchForm />
                    <ErrorMessage />
                    <UserDetails />
                </div>
            </div>
        </GithubAppProvider>
    )
}