import React, { Component } from "react";
import GlobalContext from "../../contexts/globalContext";
import axios from "axios";
import { withRouter } from "next/router";
class AuthWrapper extends Component {
  static contextType = GlobalContext;
  componentDidMount() {
    let globalState = this.context;
    if (globalState.user) {
      this.setState({ hasAuth: true });
      return globalState.user;
    } else {
      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/verify`,
        withCredentials: true,
      })
        .then((res) => {
          this.setState({ hasAuth: true });
          this.context.setGlobalState({ ...globalState, user: res.data });
          localStorage.setItem("hc_user", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  state = {
    hasAuth: false,
  };
  render() {
    return (
      <div>
        {this.state.hasAuth ? (
          this.props.children
        ) : (
          <div className="min-h-screen text-2xl text-gray-800 dark:text-gray-100 py-8 text-center">
            Loading
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AuthWrapper);
