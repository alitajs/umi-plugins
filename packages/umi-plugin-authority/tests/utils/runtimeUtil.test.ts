import { IRoute } from 'umi';
import Policy, { Action } from '@pansy/policy';
import { traverseModifyRoutes } from '../../src/utils/runtimeUtil';

const actions: Action[] = [
  { module: 'module1', action: 'action1' },
  { module: 'module1', action: 'action2' },
  { module: 'module1', action: 'action3' },
  { module: 'module2', action: 'action1' },
  { module: 'module2', action: 'action2' },
];

const policy = new Policy(actions);

policy.addPolicy({
  version: 1,
  statement: [
    {
      effect: 'allow',
      action: ['module1/*']
    }
  ]
});

let routes: IRoute[] = [];

describe('TraverseModifyRoutes', () => {
  beforeEach(() => {
    routes = [
      {
        path: '/homepage',
        authority: 'module1/action1',
        routes: null as any,
      },
      {
        path: '/admin',
        authority: 'module1/action1',
        routes: [
          {
            path: '/adminList',
            authority: 'module1/action2',
          },
          {
            path: '/adminDetail',
            authority: 'module1/action3',
          },
        ],
      },
      {
        path: '/user',
        authority: 'module2/action1',
        routes: [
          {
            path: '/userDetail',
            authority: 'module2/action2',
          },
        ],
      },
      {
        path: '/about',
        authority: 'module2/action1',
      },
    ];
  });

  it('should get expected accessible result', () => {
    const result = traverseModifyRoutes(routes, policy);

    expect(result).toEqual([
      {
        path: '/homepage',
        authority: 'module1/action1',
        unaccessible: false,
        routes: null,
      },
      {
        path: '/admin',
        authority: 'module1/action1',
        unaccessible: false,
        routes: [
          {
            path: '/adminList',
            authority: 'module1/action2',
            unaccessible: false,
          },
          {
            path: '/adminDetail',
            authority: 'module1/action3',
            unaccessible: false,
          },
        ],
      },
      {
        path: '/user',
        authority: 'module2/action1',
        unaccessible: true,
        routes: [
          {
            path: '/userDetail',
            authority: 'module2/action2',
            unaccessible: true,
          },
        ],
      },
      {
        path: '/about',
        authority: 'module2/action1',
        unaccessible: true,
      },
    ]);
  });

  it('should throw error if authority of arbitrary route is not a string', () => {
    routes[0].authority = () => {};
    expect(() => {
      traverseModifyRoutes(routes, policy);
    }).toThrowError();
  });
});
