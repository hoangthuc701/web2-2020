import React from 'react';

const Container = props => {
  const { children, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="bg-transparent hover:bg-gray-300 w-full p-3 rounded-md border-gray-300 border flex items-center justify-center cursor-pointer"
    >
      {children}
    </div>
  );
};

const Text = props => {
  const { children } = props;
  return <div>{children}</div>;
};

const FunctionButton = props => {
  const { label, onClick } = props;
  return (
    <Container onClick={() => onClick && onClick()}>
      <Text>{label}</Text>
    </Container>
  );
};

export default FunctionButton;
