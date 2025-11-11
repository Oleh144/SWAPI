import {Flex, Box} from "@chakra-ui/react";
import {keyframes} from "@emotion/react";


function Loader() {

    const rotation = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    `;
    return (
        <Flex justify="center" align="center" h="100px">
            <Box
                as="span"
                w="48px"
                h="48px"
                border="3px solid #FFF"
                borderRadius="50%"
                display="inline-block"
                position="relative"
                boxSizing="border-box"
                animation={`${rotation} 1s linear infinite`}
                _after={{
                    content: '""',
                    boxSizing: "border-box",
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    w: "56px",
                    h: "56px",
                    borderRadius: "50%",
                    border: "3px solid",
                    borderColor: "#FF3D00 transparent",
                }}
            />
        </Flex>
    )
}

export default Loader