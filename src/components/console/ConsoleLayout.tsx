import type {ReactNode} from 'react'
import '../../css/ConsoleLayout.css'

type ConsoleLayoutProps = {
    upperScreen: ReactNode
    lowerScreen: ReactNode
}

export default function ConsoleLayout({upperScreen, lowerScreen}: ConsoleLayoutProps) {
    return (
        <div className="mx-auto w-full max-w-2xl lg:max-w-3xl">
            <div className="ds-shell rounded-t-[2rem] rounded-b-xl p-3 sm:px-14 sm:py-6">
                <div className="mb-3 flex h-[15px] items-center justify-between px-2" aria-hidden="true">
                    <span className="ds-speaker"/>
                    <span className="ds-speaker"/>
                </div>
                <section aria-label="Top screen: Pokémon information" className="ds-screen flex h-80 flex-col sm:h-[26rem]">
                    {upperScreen}
                </section>
            </div>

            <div className="ds-hinge mx-3 flex h-7 items-center justify-between px-5 sm:mx-6" aria-hidden="true">
                <span className="ds-hinge-post h-full w-3"/>
                <span className="ds-led h-1.5 w-6 rounded-full"/>
            </div>

            <div className="ds-shell rounded-t-xl rounded-b-[2rem] p-3 pb-5 sm:px-14 sm:pt-6 sm:pb-7">
                <section aria-label="Bottom screen: Pokédex navigation" className="ds-screen flex h-[22rem] flex-col sm:h-[26rem]">
                    {lowerScreen}
                </section>
                <div aria-hidden="true" className="mt-4 h-[15px]" />
            </div>
        </div>
    )
}
