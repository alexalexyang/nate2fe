import { NextPage } from 'next'
import SvgIcon from '@material-ui/core/SvgIcon';

type Props = {
  fontSize: number;
}

const SvgHelper: NextPage<Props> = ({ children, fontSize }) => {


  return (
      <SvgIcon style={{ fontSize }}>
        {children}
      </SvgIcon>
  );
}

export default SvgHelper