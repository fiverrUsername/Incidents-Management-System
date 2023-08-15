import React from 'react'
import { useParams } from 'react-router-dom'
export interface WithIdProps {
  id: string;
}
export const withId = <P extends WithIdProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  // eslint-disable-next-line react/display-name
  return (props: Omit<P, "id">) => {
    const { id } = useParams<{ id: string }>();
    const componentProps = { ...props, id };
    return <WrappedComponent {...(componentProps as P)} />;
  };
};

