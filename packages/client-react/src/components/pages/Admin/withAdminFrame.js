import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from './components/Header';
import Loading from '../../common/Loading';
import { checkLoginState } from './utils';

const Container = props => {
  const { children } = props;
  return <div className="w-screen">{children}</div>;
};

const ContentContainer = props => {
  const { children } = props;
  return <div className="flex flex-col flex-1">{children}</div>;
};

const withAdminFrame = ContentComponent => {
  // eslint-disable-next-line react/prefer-stateless-function
  class HOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
      };
    }

    setLoading(state) {
      this.setState({ loading: state });
    }

    render() {
      const { loading } = this.state;
      const { history } = this.props;

      if (!checkLoginState()) {
        history.push('/');
      }

      return (
        <>
          <Container>
            <ContentContainer>
              <ContentComponent setLoading={this.setLoading} />
            </ContentContainer>
          </Container>
          {loading && <Loading />}
        </>
      );
    }
  }

  return withRouter(HOC);
};

export default withAdminFrame;
