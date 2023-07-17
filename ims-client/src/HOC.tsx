import React from 'react'
import {useParams} from 'react-router-dom'
  export interface WithIdProps {
    _id: string;
  }
export const withId = <P extends WithIdProps>(
    WrappedComponent: React.ComponentType<P>
  ) => {
    // eslint-disable-next-line react/display-name
    return (props: Omit<P, "_id">) => {
      const { _id } = useParams<{ _id: string }>();
      const componentProps = { ...props, _id };
      return <WrappedComponent {...(componentProps as P)} />;
    };
  };

