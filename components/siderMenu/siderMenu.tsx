import React from 'react';

import PropTypes from 'prop-types';
import Logo from '../icons/logo';
import { AppstoreOutlined, RiseOutlined } from '@ant-design/icons';

const SideMenu = (props: { rootClassName: any; Vector_alt2: string | undefined; Vector_src2: string | undefined; Vector_alt3: string | undefined; Vector_src3: string | undefined; Vector_alt4: string | undefined; Vector_src4: string | undefined; Vector_alt5: string | undefined; Vector_src5: string | undefined; Rectangle1_alt: string | undefined; Rectangle1_src: string | undefined; Frame_alt: string | undefined; Frame_src: string | undefined; Vector_alt: string | undefined; Vector_src: string | undefined; Vector_alt1: string | undefined; Vector_src1: string | undefined; }) => {
  return (
    <>
      <div className={`side-menu-side-menu ${props.rootClassName} `}>
        <div className="side-menu-frame1171274769">
          <div className="side-menu-menu">
            <div className="side-menu-frame1029">
              <div className="side-menu-frame1013">
                <span style={{ color: 'rgba(109, 98, 238, 1)' }}>
                  <AppstoreOutlined />
                </span>
                <span className="side-menu-text">
                  <span>Explore</span>
                </span>
              </div>
              <div className="side-menu-rectangle1" />
            </div>
            <div className="side-menu-frame">
              <div className="side-menu-frame1021">
                <RiseOutlined />
                <span className="side-menu-text2">
                  <span>Data View</span>
                </span>
              </div>
            </div>
          </div>
          <div className="side-menu-btn">
            <div className="side-menu-frame10211">
              <span className="side-menu-text4">
                <span>New Post</span>
              </span>
            </div>
          </div>
        </div>
        <div className="side-menu-logo">
          <div className="side-menu-logo1">
            {/* <div className="side-menu-logo2">
              <img
                alt={props.Vector_alt}
                src={props.Vector_src}
                className="side-menu-vector4"
              />
              <img
                alt={props.Vector_alt1}
                src={props.Vector_src1}
                className="side-menu-vector5"
              />
            </div>
            <span className="side-menu-text6">
              <span>Locusts</span>
            </span> */}
            <Logo />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .side-menu-side-menu {
            width: 300px;
            height: 1194px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            background-color: #000000;
          }
          .side-menu-frame1171274769 {
            gap: 24px;
            top: 137px;
            left: 0px;
            width: 300px;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-direction: column;
          }
          .side-menu-menu {
            gap: 14px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .side-menu-frame1029 {
            width: 300px;
            height: 52px;
            display: flex;
            position: relative;
            transition: 0.3s;
            align-items: flex-start;
            flex-shrink: 0;
          }

          .side-menu-frame1013 {
            gap: 16px;
            top: 12px;
            left: 30px;
            width: 105px;
            display: flex;
            position: absolute;
            align-items: center;
            justify-content: center;
          }
          .side-menu-category {
            width: 24px;
            height: 24px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .side-menu-category1 {
            top: 0px;
            left: 0px;
            width: 24px;
            height: 24px;
            display: flex;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 1;
          }
          .side-menu-vector {
            top: 2px;
            left: 2px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-vector1 {
            top: 2px;
            left: 14px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-vector2 {
            top: 14px;
            left: 14px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-vector3 {
            top: 14px;
            left: 2px;
            width: 8px;
            height: 8px;
            position: absolute;
          }
          .side-menu-text {
            color: rgba(109, 98, 238, 1);
            height: auto;
            font-size: 18px;
            font-style: Medium;
            text-align: left;
            font-family: Poppins;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-rectangle1 {
            top: 16px;
            left: 0px;
            width: 4px;
            height: 18px;
            position: absolute;
            border-radius: 3px;
            background-color: rgba(109, 98, 238, 1);
          }
          .side-menu-frame {
            gap: 4px;
            width: 300px;
            height: 52px;
            display: flex;
            padding: 4px 8px 4px 0;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 8px;
          }
          .side-menu-frame1021 {
            gap: 16px;
            top: 12px;
            left: 30px;
            width: 133px;
            display: flex;
            position: absolute;
            align-items: center;
            justify-content: center;
          }
          .side-menu-frame1 {
            width: 24px;
            height: 24px;
          }
          .side-menu-text2 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 18px;
            font-style: Medium;
            text-align: left;
            font-family: Poppins;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-btn {
            gap: 4px;
            width: 299px;
            height: 52px;
            display: flex;
            padding: 4px 8px 4px 0;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-radius: 8px;
          }
          .side-menu-frame10211 {
            gap: 8px;
            top: 0px;
            left: 30px;
            width: 239px;
            height: 52px;
            display: flex;
            padding: 12px 64px;
            position: absolute;
            align-items: center;
            flex-shrink: 0;
            border-radius: 44px;
            justify-content: center;
            background-image: linear-gradient(
              180deg,
              rgba(110, 98, 238, 1) 2%,
              rgba(63, 61, 250, 1) 100%
            );
          }
          .side-menu-text4 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 18px;
            font-style: Medium;
            text-align: left;
            font-family: Poppins;
            font-weight: 500;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-logo {
            top: 0px;
            left: 0px;
            width: 300px;
            height: 100px;
            display: flex;
            overflow: hidden;
            position: absolute;
            align-items: flex-start;
            flex-shrink: 0;
          }
          .side-menu-logo1 {
            gap: 12px;
            top: 29px;
            left: 30px;
            width: 172px;
            display: flex;
            position: absolute;
            align-items: center;
            flex-shrink: 0;
          }
          .side-menu-logo2 {
            width: 18px;
            height: 34px;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 1;
          }
          .side-menu-vector4 {
            top: 0px;
            left: -0.000003814697265625px;
            width: 18px;
            height: 14px;
            position: absolute;
          }
          .side-menu-vector5 {
            top: 34px;
            left: -0.000003814697265625px;
            width: 18px;
            height: 14px;
            position: absolute;
          }
          .side-menu-text6 {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 34px;
            font-style: Bold;
            text-align: left;
            font-family: Helvetica Neue;
            font-weight: 700;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .side-menu-root-class-name {
            top: 0px;
            left: 0px;
            position: absolute;
          }
        `}
      </style>
    </>
  );
};

SideMenu.defaultProps = {
  rootClassName: '',
  Vector_src3: '/playground_assets/vectori444-s31r.svg',
  Vector_src4: '/playground_assets/vectori444-4rx8.svg',
  Vector_src5: '/playground_assets/vectori444-8zeg.svg',
  Vector_alt3: 'VectorI444',
  Vector_src1: '/playground_assets/vectori444-8twj.svg',
  Vector_alt: 'VectorI444',
  Rectangle1_alt: 'Rectangle1I444',
  Rectangle1_src: '/playground_assets/rectangle1i444-eze-200w.png',
  Frame_alt: 'FrameI444',
  Frame_src: '/playground_assets/framei444-mtub.svg',
  Vector_alt5: 'VectorI444',
  Vector_alt4: 'VectorI444',
  Vector_src: '/playground_assets/vectori444-e535.svg',
  Vector_alt1: 'VectorI444',
  Vector_alt2: 'VectorI444',
  Vector_src2: '/playground_assets/vectori444-cbyy.svg'
};

SideMenu.propTypes = {
  rootClassName: PropTypes.string,
  Vector_src3: PropTypes.string,
  Vector_src4: PropTypes.string,
  Vector_src5: PropTypes.string,
  Vector_alt3: PropTypes.string,
  Vector_src1: PropTypes.string,
  Vector_alt: PropTypes.string,
  Rectangle1_alt: PropTypes.string,
  Rectangle1_src: PropTypes.string,
  Frame_alt: PropTypes.string,
  Frame_src: PropTypes.string,
  Vector_alt5: PropTypes.string,
  Vector_alt4: PropTypes.string,
  Vector_src: PropTypes.string,
  Vector_alt1: PropTypes.string,
  Vector_alt2: PropTypes.string,
  Vector_src2: PropTypes.string
};

export default SideMenu;
