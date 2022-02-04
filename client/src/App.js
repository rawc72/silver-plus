import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import Login from "./pages/login";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

import Header from "./components/Nav";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
    uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return ( <
        ApolloProvider client = { client } >
        <
        Router >
        <
        div className = "flex-column justify-flex-start min-100-vh" >
        <
        Header / >
        <
        div className = "container" >
        <
        Switch >
        <
        Route exact path = "/"
        component = { Home }
        />{" "} <
        Route exact path = "/login"
        component = { Login }
        />{" "} <
        Route exact path = "/signup"
        component = { Signup }
        />{" "} <
        Route exact path = "/profile/:username?"
        component = { Profile }
        /> <
        Route component = { NoMatch }
        />{" "} < /
        Switch > { " " } <
        /div>{" "} <
        Footer / >
        <
        /div>{" "} < /
        Router > { " " } <
        /ApolloProvider>
    );
}

export default App;