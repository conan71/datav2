import React from 'react';
import Loadable from 'react-loadable';
interface props {
  id?: string;
  url?: string;
  name?: string;
  loader?: any;
}
const Plug = ({ id, url, name, loader }: props) => {
  const LoadableComponent = Loadable({
    loader: () => import(`./${name}.tsx`),
    // loader: () => import(`./echart`),
    loading: (props) => {
      return <div>Loading...</div>;
    },
    delay: 5000,
    render(loaded, props) {
      let Component = loaded.default;
      return <Component id={id} />;
    },
  });
  return <LoadableComponent />;
};
export default Plug;
