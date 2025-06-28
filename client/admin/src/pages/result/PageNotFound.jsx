import PropTypes from "prop-types";
import { Button, Result } from "antd";
import { useNavigate } from "react-router";

const PageNotFound = ({ buttonText, url }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(url);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          url && (
            <Button type="primary" onClick={handleClick}>
              {buttonText}
            </Button>
          )
        }
      />
    </div>
  );
};

PageNotFound.propTypes = {
  buttonText: PropTypes.string,
  url: PropTypes.string,
};

export default PageNotFound;
