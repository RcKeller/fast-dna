import * as React from "react";
import * as ShallowRenderer from "react-test-renderer/shallow";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import examples from "./examples.data";
import TextAction, {
    ButtonPosition,
    TextActionHandledProps,
    TextActionManagedClasses,
    TextActionProps,
    TextActionUnhandledProps,
} from "./text-action";
import { TextActionClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { Button } from "../button";
import { ButtonAppearance } from "../button/button.props";

const managedClasses: TextActionClassNameContract = {
    textAction: "text-action",
    textAction__disabled: "text-action",
    textAction_button: "text-action",
    textAction_beforeGlyph: "text-action",
    textAction_afterGlyph: "text-action",
};

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("text-action", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((TextAction as any).name).toBe(TextAction.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<TextAction />);
        }).not.toThrow();
    });

    test("should return an object that includes all valid props which are not enumerated as handledProps", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
        };

        const unhandledProps: TextActionUnhandledProps = {
            "aria-hidden": true,
        };
        const props: TextActionProps = { ...handledProps, ...unhandledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(rendered.find("input").prop("aria-hidden")).not.toBe(undefined);
        expect(rendered.find("input").prop("aria-hidden")).toEqual(true);
    });

    test("should set a default type of `text` on inner input", () => {
        const rendered: any = mount(<TextAction managedClasses={managedClasses} />);

        expect(rendered.find("input").prop("type")).not.toBe(undefined);
        expect(rendered.find("input").prop("type")).toEqual("text");
    });

    test("should NOT render with a disabled value if no `disabled` prop is passed", () => {
        const rendered: any = mount(<TextAction managedClasses={managedClasses} />);

        expect(rendered.find("input").prop("disabled")).toBe(null);
    });

    test("should render with a `disabled` value when `disabled` prop is passed", () => {
        const rendered: any = mount(
            <TextAction managedClasses={managedClasses} disabled={true} />
        );

        expect(rendered.find("input").prop("disabled")).toBe(true);
    });

    test("should NOT render with a placeholder value if no `placeholder` prop is passed", () => {
        const rendered: any = mount(<TextAction managedClasses={managedClasses} />);

        expect(rendered.find("input").prop("placeholder")).toBe(null);
    });

    test("should render with a placeholder value when `placeholder` prop is passed", () => {
        const rendered: any = mount(
            <TextAction managedClasses={managedClasses} placeholder={"Test"} />
        );

        expect(rendered.find("input").prop("placeholder")).toEqual("Test");
    });

    test("should render a button in the after position by default if a button is passed as a prop", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            button: (classname?: string, disabled?: boolean): React.ReactNode => {
                return (
                    <Button type={"submit"} className={classname} disabled={disabled}>
                        {"Text action"}
                    </Button>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(rendered.find("button")).not.toBe(undefined);
        expect(rendered.prop("buttonPosition")).toEqual(ButtonPosition.after);
    });

    test("should render a button in the before position if correct props are passed", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            buttonPosition: ButtonPosition.before,
            button: (classname?: string, disabled?: boolean): React.ReactNode => {
                return (
                    <Button type={"submit"} className={classname} disabled={disabled}>
                        {"Text action"}
                    </Button>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(rendered.find("button")).not.toBe(undefined);
        expect(rendered.prop("buttonPosition")).toEqual(ButtonPosition.before);
    });

    test("should render a glyph in the before position if passed as a prop", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            beforeGlyph: (classname?: string): React.ReactNode => {
                return (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classname}
                    >
                        <path d="M10.3906 9.39844C11.099 9.64323" fill="black" />
                    </svg>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(rendered.find("svg")).not.toBe(undefined);
        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .first()
                .childAt(0)
                .type()
        ).toEqual("svg");
    });

    test("should render a glyph in the after position if passed as a prop", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            afterGlyph: (classname?: string): React.ReactNode => {
                return (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classname}
                    >
                        <path d="M10.3906 9.39844C11.099 9.64323" fill="black" />
                    </svg>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(rendered.find("svg")).not.toBe(undefined);
        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .first()
                .childAt(1)
                .type()
        ).toEqual("svg");
    });

    test("should render a button only if a glyph and button are passed in the same (after) position", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            button: (classname?: string, disabled?: boolean): React.ReactNode => {
                return (
                    <Button type={"submit"} className={classname} disabled={disabled}>
                        {"Text action"}
                    </Button>
                );
            },
            afterGlyph: (classname?: string): React.ReactNode => {
                return (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classname}
                    >
                        <path d="M10.3906 9.39844C11.099 9.64323" fill="black" />
                    </svg>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .find("svg")
                .exists()
        ).toBe(false);
        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .find("button")
                .exists()
        ).toBe(true);
    });

    test("should render a button only if a glyph and button are passed in the same (before) position", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            buttonPosition: ButtonPosition.before,
            button: (classname?: string, disabled?: boolean): React.ReactNode => {
                return (
                    <Button type={"submit"} className={classname} disabled={disabled}>
                        {"Text action"}
                    </Button>
                );
            },
            beforeGlyph: (classname?: string): React.ReactNode => {
                return (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classname}
                    >
                        <path d="M10.3906 9.39844C11.099 9.64323" fill="black" />
                    </svg>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .find("svg")
                .exists()
        ).toBe(false);
        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .find("button")
                .exists()
        ).toBe(true);
    });

    test("should render a button and glyph if they are passed in different positions", () => {
        const handledProps: TextActionHandledProps = {
            managedClasses,
            button: (classname?: string, disabled?: boolean): React.ReactNode => {
                return (
                    <Button type={"submit"} className={classname} disabled={disabled}>
                        {"Text action"}
                    </Button>
                );
            },
            beforeGlyph: (classname?: string): React.ReactNode => {
                return (
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={classname}
                    >
                        <path d="M10.3906 9.39844C11.099 9.64323" fill="black" />
                    </svg>
                );
            },
        };

        const props: TextActionProps = { ...handledProps };
        const rendered: any = mount(<TextAction {...props} />);

        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .find("svg")
                .exists()
        ).toBe(true);
        expect(
            rendered
                .find(`.${managedClasses.textAction}`)
                .find("button")
                .exists()
        ).toBe(true);
    });
});
