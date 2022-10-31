import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import './LoaderSkeleton.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: '',
  id: undefined,
  size: 12,
};


const LoaderSkeleton = ({ className, id, size }) => {
  const classComponent = className ? ['LoaderSkeleton', className] : ['LoaderSkeleton'];
  const totalSkeletonArray = Array(size).fill({})

  const classSize = size > 10 ? 'max-width-12' : 'max-width-1';
  const classHeader = size > 10 ? 'HeaderSkeleton-12' : 'HeaderSkeleton-1';
  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <section>
        <div className='SkeletonContainer'>
          { totalSkeletonArray.map((value, index) => {
            return <div key={ index } className={ classSize }>
              <Card style={ { width: '70rem' } }>
                <Card.Body>
                  <Placeholder animation="glow" as={ Card.Title }>
                    <Placeholder className={ classHeader } xs={ 12 } />
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