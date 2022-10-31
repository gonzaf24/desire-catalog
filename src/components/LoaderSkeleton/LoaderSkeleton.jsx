import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import './LoaderSkeleton.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const totalSkeletonArray = Array(12).fill({})

const LoaderSkeleton = ({ className, id }) => {
  const classComponent = className ? ['LoaderSkeleton', className] : ['LoaderSkeleton'];

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <section>
        <div className='SkeletonContainer'>
          { totalSkeletonArray.map((value, index) => {
            return <div key={ index } className="d-flex justify-content-around  max-width">
              <Card style={ { width: '18rem' } }>
                <Card.Body>
                  <Placeholder animation="glow" as={ Card.Title }>
                    <Placeholder className='HeaderSkeleton' xs={ 12 } />
                    <Placeholder xs={ 12 } />
                    <Placeholder xs={ 12 } />
                    <Placeholder xs={ 12 } />
                    <Placeholder xs={ 12 } />
                  </Placeholder>
                </Card.Body>
              </Card>
            </div>
          })
          }
        </div>
      </section>
    </div>
  );
};

LoaderSkeleton.propTypes = propTypes;
LoaderSkeleton.defaultProps = defaultProps;

export default LoaderSkeleton;